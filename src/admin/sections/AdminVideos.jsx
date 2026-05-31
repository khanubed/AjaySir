import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  Play,
  Plus,
  Trash2,
  Edit3,
  Upload,
  X,
  Check,
  Type,
  Link2,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

// Using the custom API instance (with interceptors and baseURL)
import api from "../../api/axios.js";
// Local fallback data
import { videoData as fallbackData } from "../../data/videoData.js";

export const AdminVideos = () => {
  const [sectionTitle, setSectionTitle] = useState(fallbackData.sectionTitle);
  const [sectionSubtitle, setSectionSubtitle] = useState(fallbackData.sectionSubtitle);
  const [videos, setVideos] = useState(fallbackData.videos);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [previewVideoUrl, setPreviewVideoUrl] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
  });

  // --- 1. FETCH DATA FROM DATABASE ---
  useEffect(() => {
    const fetchVideoContent = async () => {
      try {
        // Interceptor handles baseURL and Authorization headers
        const res = await api.get("/content/videos");

        const remoteValues = res.data?.data?.values;

        if (remoteValues) {
          setSectionTitle(remoteValues.sectionTitle || fallbackData.sectionTitle);
          setSectionSubtitle(remoteValues.sectionSubtitle || fallbackData.sectionSubtitle);
          setVideos(
            remoteValues.videos?.length > 0
              ? remoteValues.videos
              : fallbackData.videos,
          );
        }
      } catch (err) {
        console.warn("Backend unavailable, using local fallback data");
      } finally {
        setLoading(false);
      }
    };
    fetchVideoContent();
  }, []);

  // --- 2. IMAGE UPLOAD LOGIC (Cloudinary via Backend) ---
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      setIsSaving(true);
      // 'api' automatically attaches the JWT from localStorage
      const res = await api.post("/upload", uploadData);
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, thumbnail: res.data.imageUrl }));
      }
    } catch (err) {
      alert("Image upload failed!");
    } finally {
      setIsSaving(false);
    }
  };

  // --- 3. SYNC WITH DATABASE (Update Entire Section) ---
  const syncWithServer = async (updatedVideos, updatedTitle, updatedSubtitle) => {
    try {
      setIsSaving(true);
      const payload = {
        sectionTitle: updatedTitle || sectionTitle,
        sectionSubtitle: updatedSubtitle || sectionSubtitle,
        videos: updatedVideos || videos,
      };

      // Updates the entire video section in the database
      await api.put("/content/videos", payload);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // --- 4. FORM HANDLERS ---
  const handleCreateOpen = () => {
    setEditingVideo(null); // Reset editing state for new entry
    setFormData({
      title: "",
      description: "",
      thumbnail: "",
      videoUrl: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format the YouTube URL into an embeddable format
    const packedData = {
      ...formData,
      id: editingVideo ? editingVideo.id : Date.now(),
      videoUrl: formData.videoUrl.includes("embed")
        ? formData.videoUrl
        : `https://www.youtube.com/embed/${formData.videoUrl.split("v=")[1] || formData.videoUrl.split("/").pop()}`,
    };

    let updatedList;
    if (editingVideo) {
      updatedList = videos.map((v) => (v.id === editingVideo.id ? packedData : v));
    } else {
      updatedList = [...videos, packedData];
    }

    setVideos(updatedList);
    setIsModalOpen(false);
    await syncWithServer(updatedList); // Push changes to DB
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      const updatedList = videos.filter((v) => v.id !== id);
      setVideos(updatedList);
      await syncWithServer(updatedList);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-saffron" size={48} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fffaf3] p-6 text-darkbrown font-sans">
      {/* HEADER SETTINGS SECTION */}
      <div className="max-w-7xl mx-auto bg-white border border-saffron/20 rounded-3xl p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Type size={18} className="text-saffron" /> Header Settings
          </h2>
          <button
            onClick={() => syncWithServer()}
            className="text-xs bg-darkbrown text-white px-6 py-2 rounded-xl hover:bg-black transition-all flex items-center gap-2"
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            Save Title & Subtitle
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            placeholder="Main Section Title"
          />
          <input
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
            value={sectionSubtitle}
            onChange={(e) => setSectionSubtitle(e.target.value)}
            placeholder="Main Section Subtitle"
          />
        </div>
      </div>

      {/* TOOLBAR AND ADD BUTTON */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center border-b border-saffron/10 pb-6 mb-8 gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FontAwesomeIcon icon={faYoutube} className="text-red-600" /> Video Gallery
        </h1>
        <button
          onClick={handleCreateOpen}
          className="bg-saffron text-white py-3 px-6 rounded-xl shadow-md text-sm font-medium flex items-center gap-2"
        >
          <Plus size={16} /> Add New Video
        </button>
      </div>

      {/* VIDEO GRID LISTING */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {videos.map((video) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-[2rem] border border-saffron/10 shadow-sm overflow-hidden flex flex-col group"
            >
              {/* Thumbnail and Play Overlay */}
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => setPreviewVideoUrl(video.videoUrl)}
                >
                  <div className="w-12 h-12 bg-saffron/90 rounded-full flex items-center justify-center shadow-lg">
                    <Play fill="currentColor" size={18} />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-saffron mb-1 truncate">{video.title}</h3>
                <p className="text-xs text-brown/70 line-clamp-2">{video.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={() => {
                    setEditingVideo(video);
                    setFormData(video);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 border border-saffron text-saffron py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-saffron hover:text-white transition-all"
                >
                  <Edit3 size={13} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="bg-red-50 text-red-600 p-2 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FORM MODAL (ADD/EDIT) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">
                  {editingVideo ? "Edit Video" : "Add New Video"}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Video Title"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border focus:ring-1 focus:ring-saffron outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <textarea
                  placeholder="Short Description"
                  required
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border resize-none focus:ring-1 focus:ring-saffron outline-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="YouTube Video URL"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border focus:ring-1 focus:ring-saffron outline-none"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                />

                {/* THUMBNAIL MANAGEMENT */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-brown flex items-center gap-1">
                    <ImageIcon size={14} /> Thumbnail Preview
                  </label>

                  {formData.thumbnail && (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden border">
                      <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, thumbnail: "" })}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="file"
                      id="thumb-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailUpload}
                    />
                    <label
                      htmlFor="thumb-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer hover:bg-saffron/5 transition-all text-sm text-gray-500"
                    >
                      <Upload size={18} /> {formData.thumbnail ? "Change Image" : "Upload Image"}
                    </label>

                    <div className="relative">
                      <Link2 size={14} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="url"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs"
                        placeholder="Or paste external Image URL..."
                        value={formData.thumbnail.startsWith("data:") ? "" : formData.thumbnail}
                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-saffron text-white px-6 py-2 rounded-xl text-sm flex items-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN VIDEO PREVIEW OVERLAY */}
      <AnimatePresence>
        {previewVideoUrl && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setPreviewVideoUrl(null)}
          >
            <div
              className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={previewVideoUrl}
                className="w-full h-full"
                allowFullScreen
                title="YouTube Preview"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminVideos;