import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Loader2,
  RefreshCcw,
  Check,
  Trash2,
  Upload,
  X,
  Eye,
  ImageIcon,
  Link2,
  Type,
  LayoutGrid,
  Plus,
} from "lucide-react";

// Use custom API instance for automatic base URL and Auth headers
import api from "../../api/axios.js";
import { galleryImages as fallbackImages } from "../../data/gallery";

export const AdminGallery = () => {
  // --- State Management ---
  const [images, setImages] = useState(fallbackImages);
  const [sectionTitle, setSectionTitle] = useState("दिव्य क्षण एवं पवित्र अनुष्ठान");
  const [sectionSubtitle, setSectionSubtitle] = useState("पवित्र अनुष्ठानों की दिव्य झलकियाँ देखें।");

  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({ imageUrl: "" });

  // --- 1. Fetch Data from Database (Silent Load) ---
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get("/content/gallery");
        const data = res.data?.data?.values;

        if (data && data.images?.length > 0) {
          setImages(data.images);
          setSectionTitle(data.sectionTitle);
          setSectionSubtitle(data.sectionSubtitle);
        }
      } catch (err) {
        console.warn("Backend link failed, using local backup...");
        toast.error("Offline mode active. Using local data.", {
          icon: "📴",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // --- 2. Sync State with Backend ---
  const saveToBackend = async (
    updatedImages = images,
    tTitle = sectionTitle,
    tSub = sectionSubtitle,
  ) => {
    const payload = {
      sectionTitle: tTitle,
      sectionSubtitle: tSub,
      images: updatedImages,
    };

    // toast.promise handles the loading/success/error lifecycle automatically
    return toast.promise(
      api.put("/content/gallery", payload),
      {
        loading: "Syncing with live server...",
        success: <b>Live data updated!</b>,
        error: <b>Sync failed. Check connection.</b>,
      },
      { style: { minWidth: "250px" } },
    );
  };

  // --- 3. Image Upload Logic (Cloudinary via Backend) ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    setIsUploading(true);
    const uploadPromise = api.post("/upload", uploadData);

    toast.promise(uploadPromise, {
      loading: "Uploading image to cloud...",
      success: (res) => {
        setFormData({ imageUrl: res.data.imageUrl });
        setIsUploading(false);
        return "Upload complete!";
      },
      error: () => {
        setIsUploading(false);
        return "Upload failed.";
      },
    });
  };

  // --- 4. Content Handlers ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl.trim()) return toast.error("Please provide an image or URL");

    const newImages = [
      ...images,
      { id: Date.now(), image: formData.imageUrl.trim() },
    ];
    
    setImages(newImages);
    setIsModalOpen(false);
    setFormData({ imageUrl: "" }); // Reset form state
    await saveToBackend(newImages);
  };

  const handleDelete = (id) => {
    // Custom confirmation toast
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Remove this image from the gallery?</p>
          <div className="flex gap-2 justify-end">
            <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 text-xs">
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const filtered = images.filter((img) => img.id !== id);
                setImages(filtered);
                await saveToBackend(filtered);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      ),
      { duration: 6000, position: "bottom-center" },
    );
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-saffron" size={48} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fffaf3] p-6 text-darkbrown">
      <Toaster position="top-right" reverseOrder={false} />

      {/* HEADER SETTINGS SECTION */}
      <div className="max-w-7xl mx-auto bg-white border border-saffron/20 rounded-3xl p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Type size={18} className="text-saffron" /> Header Configuration
          </h2>
          <button
            onClick={() => saveToBackend()}
            className="flex items-center gap-2 bg-darkbrown text-white px-5 py-2 rounded-xl text-xs hover:bg-black transition-all font-bold active:scale-95"
          >
            <RefreshCcw size={14} /> Update Live Header
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:border-saffron text-sm font-semibold"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            placeholder="Main Gallery Title"
          />
          <textarea
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:border-saffron text-sm resize-none"
            value={sectionSubtitle}
            onChange={(e) => setSectionSubtitle(e.target.value)}
            placeholder="Gallery Subtitle"
          />
        </div>
      </div>

      {/* GALLERY TOOLBAR */}
      <div className="max-w-7xl mx-auto flex justify-between items-end mb-8 border-b border-saffron/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <LayoutGrid className="text-saffron" /> Media Gallery
          </h1>
          <p className="text-xs text-brown/60">Manage visual content displayed on the website</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-saffron text-white py-3 px-6 rounded-xl shadow-md hover:scale-105 transition-transform flex items-center gap-2 text-sm font-bold"
        >
          <Plus size={18} /> Add New Media
        </button>
      </div>

      {/* MASONRY IMAGE GRID */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
        <AnimatePresence>
          {images.map((img) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden border border-saffron/10 shadow-sm"
            >
              <img
                src={img.image}
                alt=""
                className="w-full h-auto object-cover min-h-[150px] bg-gray-100"
              />
              {/* Overlay with Preview and Delete buttons */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <span className="text-[10px] text-white/50">#IMG_{img.id}</span>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => setPreviewImage(img.image)}
                    className="flex-1 bg-white text-darkbrown py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <Eye size={14} /> Preview
                  </button>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ADD MEDIA MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-[2rem] p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <ImageIcon className="text-saffron" /> Upload Media
                </h3>
                <X className="cursor-pointer" onClick={() => setIsModalOpen(false)} />
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-full h-40 border-2 border-dashed border-saffron/20 rounded-2xl bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-saffron/5 transition-colors overflow-hidden relative"
              >
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <>
                    {isUploading ? (
                      <Loader2 className="animate-spin text-saffron" />
                    ) : (
                      <Upload className="text-saffron mb-2" />
                    )}
                    <p className="text-xs text-gray-400">
                      {isUploading ? "Uploading..." : "Click to select image"}
                    </p>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*"
                />
              </div>

              <div className="mt-4">
                <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">
                  Or paste external URL
                </label>
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-100 text-xs font-mono"
                  placeholder="https://images.example.com/photo.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ imageUrl: e.target.value })}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-sm text-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-saffron text-white rounded-xl font-bold text-sm shadow-lg hover:bg-orange-500 transition-colors"
                >
                  Add to Gallery
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN LIGHTBOX PREVIEW */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-6 right-6 text-white hover:text-saffron transition-colors z-[130]"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-4xl max-h-[85vh] overflow-hidden rounded-xl border border-white/10"
            >
              <img
                src={previewImage}
                alt="Full preview"
                className="w-full h-full object-contain max-h-[85vh]"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGallery;