import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {faYoutube } from "@fortawesome/free-brands-svg-icons"
import { 
  Play, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Check, 
//   Youtube, 
  Type, 
  FileText, 
  Link2, 
  Image as ImageIcon 
} from "lucide-react";
import { videoData as initialVideoData } from "../../data/videoData.js";

export const AdminVideos = () => {
  // Extract configuration metadata alongside initial data structure
  const [sectionTitle, setSectionTitle] = useState(initialVideoData.sectionTitle);
  const [sectionSubtitle, setSectionSubtitle] = useState(initialVideoData.sectionSubtitle);
  const [videos, setVideos] = useState(initialVideoData.videos);
  
  // Overlay Modals management variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [previewVideoUrl, setPreviewVideoUrl] = useState(null);

  // Default clean form schema
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
  });

  // Automatically extracts clean YouTube Embed code structures if user paste raw address bar links
  const normalizeYoutubeEmbed = (url) => {
    if (!url) return "";
    // If it's already an embed link, return as-is
    if (url.includes("youtube.com/embed/")) return url;
    
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split(/[&?#]/)[0];
    } else if (url.includes("embed/")) {
      videoId = url.split("embed/")[1]?.split(/[?#]/)[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // Automatically pulls standard high-quality YouTube image assets if no custom thumb is supplied
  const autoGenerateThumbnail = (embedUrl) => {
    if (!embedUrl || !embedUrl.includes("embed/")) return "";
    const videoId = embedUrl.split("embed/")[1]?.split(/[?#]/)[0];
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
  };

  const handleCreateOpen = () => {
    setEditingVideo(null);
    setFormData({ title: "", description: "", thumbnail: "", videoUrl: "" });
    setIsModalOpen(true);
  };

  const handleEditOpen = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      videoUrl: video.videoUrl,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("क्या आप वाकई इस वीडियो को हटाना चाहते हैं?")) {
      setVideos(videos.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmbedUrl = normalizeYoutubeEmbed(formData.videoUrl);
    const finalThumbnail = formData.thumbnail.trim() || autoGenerateThumbnail(cleanEmbedUrl);

    const packedData = {
      ...formData,
      videoUrl: cleanEmbedUrl,
      thumbnail: finalThumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    };

    if (editingVideo) {
      setVideos(videos.map((item) => (item.id === editingVideo.id ? { ...item, ...packedData } : item)));
    } else {
      const newVideo = {
        id: videos.length > 0 ? Math.max(...videos.map((v) => v.id)) + 1 : 1,
        ...packedData,
      };
      setVideos([...videos, newVideo]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] p-6 text-darkbrown font-sans">
      
      {/* SECTION 1: Section Title & Subtitle Configuration Banner */}
      <div className="max-w-7xl mx-auto bg-white border border-saffron/20 rounded-3xl p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold text-darkbrown flex items-center gap-2 mb-4">
          <Type size={18} className="text-saffron" /> हेडर कॉन्फ़िगरेशन (Section Header Customization)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-brown/80">मुख्य शीर्षक (Hindi Title)</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
              value={sectionTitle} 
              onChange={(e) => setSectionTitle(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-brown/80">उपशीर्षक (Subtitle Description)</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
              value={sectionSubtitle} 
              onChange={(e) => setSectionSubtitle(e.target.value)} 
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Action Sub-Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center border-b border-saffron/10 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-darkbrown flex items-center gap-2">
            <faYoutube className="text-red-600" /> वीडियो गैलरी प्रबंधन (Video Content Items)
          </h1>
          <p className="text-xs text-brown/60 mt-0.5">
            वेबसाइट की वीडियो गैलरी में दिखाए जाने वाले वीडियो, उनकी लिंक और थंबनेल बदलें।
          </p>
        </div>
        <button
          onClick={handleCreateOpen}
          className="flex items-center gap-2 bg-saffron text-white font-medium py-3 px-6 rounded-xl shadow-md hover:bg-saffron/90 transition-all duration-200 transform active:scale-95 text-sm"
        >
          <Plus size={16} /> नया वीडियो जोड़ें
        </button>
      </div>

      {/* SECTION 3: Content List Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2rem] border border-saffron/10 shadow-sm overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Simulated Grid Preview Element from production code block */}
                <div className="relative h-48 overflow-hidden bg-black">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer" onClick={() => setPreviewVideoUrl(video.videoUrl)}>
                    <div className="w-12 h-12 bg-saffron/90 rounded-full flex items-center justify-center text-darkbrown shadow-lg hover:scale-110 transition-transform duration-200">
                      <Play fill="currentColor" size={18} />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white font-mono text-[10px] py-1 px-2.5 rounded-full">
                    क्रम: {index + 1}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-saffron mb-1.5 truncate">{video.title}</h3>
                  <p className="text-xs text-brown/70 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                    {video.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-[11px] text-brown/50 bg-gray-50 p-2 rounded-lg border border-gray-100 overflow-hidden whitespace-nowrap text-ellipsis">
                    <Link2 size={12} className="shrink-0" /> {video.videoUrl}
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="px-6 pb-6 pt-2 flex items-center gap-3 border-t border-gray-50 bg-gray-50/30">
                <button
                  onClick={() => handleEditOpen(video)}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-saffron text-saffron hover:bg-saffron hover:text-white transition-all py-2 px-3 rounded-xl text-xs font-semibold"
                >
                  <Edit3 size={13} /> संपादन करें
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all p-2 rounded-xl border border-red-100 hover:border-transparent"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* MODAL 1: Create / Edit Entity Management Overlays */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="bg-white rounded-[2rem] shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-saffron/20"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-lg font-bold text-darkbrown">
                  {editingVideo ? "वीडियो विवरण बदलें" : "नया यूट्यूब वीडियो जोड़ें"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 text-gray-400">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-brown flex items-center gap-1 mb-1"><Type size={14}/> वीडियो का शीर्षक (Video Title) *</label>
                  <input
                    type="text" required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                    placeholder="जैसे: महा रुद्राभिषेक पूजा..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-brown flex items-center gap-1 mb-1"><FileText size={14}/> संक्षिप्त विवरण (Short Description) *</label>
                  <textarea
                    required rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none"
                    placeholder="पूजा अनुष्ठान या मंत्रोच्चार के बारे में एक या दो पंक्तियाँ लिखें..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-brown flex items-center gap-1 mb-1"><Link2 size={14}/> यूट्यूब वीडियो लिंक (YouTube URL) *</label>
                  <input
                    type="text" required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                    placeholder="जैसे: https://www.youtube.com/watch?v=... या शेयर लिंक"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-brown flex items-center gap-1"><ImageIcon size={14}/> थंबनेल इमेज लिंक (Custom Thumbnail URL)</label>
                    <span className="text-[10px] text-gray-400 font-medium">(खाली छोड़ने पर यूट्यूब से स्वतः ले लेगा)</span>
                  </div>
                  <input
                    type="url"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 text-xs font-mono"
                    placeholder="https://example.com/custom-thumbnail.jpg"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-50 text-xs font-medium">
                    रद्द करें
                  </button>
                  <button type="submit" className="bg-saffron text-white px-5 py-2 rounded-xl text-xs font-medium hover:bg-saffron/90 flex items-center gap-1.5 shadow-md">
                    <Check size={14} /> डेटा सहेजें (Save)
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Interactive Sandbox Video Stream Player */}
      <AnimatePresence>
        {previewVideoUrl && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-sm">
            <button onClick={() => setPreviewVideoUrl(null)} className="absolute top-6 right-6 text-white hover:text-saffron transition-colors">
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <iframe
                src={previewVideoUrl}
                title="Admin Preview Player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminVideos;