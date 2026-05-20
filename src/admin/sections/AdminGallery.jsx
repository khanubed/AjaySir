    import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  X, 
  Check, 
  Type, 
  Link2, 
  Eye,
  LayoutGrid
} from "lucide-react";
import { galleryImages as initialGalleryImages } from "../../data/gallery";

export const AdminGallery = () => {
  // Section text states
  const [sectionTitle, setSectionTitle] = useState("दिव्य क्षण एवं पवित्र अनुष्ठान");
  const [sectionSubtitle, setSectionSubtitle] = useState(
    "पूर्ण भक्ति, सनातन परंपरा और प्रामाणिक वैदिक पद्धतियों के साथ संपन्न कराए गए पवित्र अनुष्ठानों, आध्यात्मिक समारोहों, हवन, विशेष पूजा और अलौकिक क्षणों की दिव्य झलकियाँ देखें।"
  );
  
  const [images, setImages] = useState(initialGalleryImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Form State for new gallery entries
  const [formData, setFormData] = useState({
    imageUrl: "",
  });

  const handleCreateOpen = () => {
    setFormData({ imageUrl: "" });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("क्या आप इस तस्वीर को गैलरी से हटाना चाहते हैं?")) {
      setImages(images.filter((img) => img.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.imageUrl.trim()) return;

    const newImageItem = {
      id: images.length > 0 ? Math.max(...images.map((img) => img.id)) + 1 : 1,
      image: formData.imageUrl.trim(),
    };

    setImages([...images, newImageItem]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] p-6 text-darkbrown font-sans">
      
      {/* SECTION 1: Header Live Settings */}
      <div className="max-w-7xl mx-auto bg-white border border-saffron/20 rounded-3xl p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold text-darkbrown flex items-center gap-2 mb-4">
          <Type size={18} className="text-saffron" /> गैलरी हेडर सेटिंग्स (Gallery Header Configuration)
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-brown/70">शीर्षक (Gallery Title)</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
              value={sectionTitle} 
              onChange={(e) => setSectionTitle(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-brown/70">उपशीर्षक विवरण (Gallery Subtitle)</label>
            <textarea 
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none"
              value={sectionSubtitle} 
              onChange={(e) => setSectionSubtitle(e.target.value)} 
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Control Hub Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center border-b border-saffron/10 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-darkbrown flex items-center gap-2">
            <LayoutGrid className="text-saffron" /> मीडिया गैलरी ग्रिड (Live Gallery Dashboard)
          </h1>
          <p className="text-xs text-brown/60 mt-0.5">
            मैसोनरी (Masonry) लेआउट के चित्रों को प्रबंधित करें। नई वेब तस्वीरें जोड़ें या पुरानी हटाएं।
          </p>
        </div>
        <button
          onClick={handleCreateOpen}
          className="flex items-center gap-2 bg-saffron text-white font-medium py-3 px-6 rounded-xl shadow-md hover:bg-saffron/90 transition-all duration-200 transform active:scale-95 text-sm"
        >
          <Plus size={16} /> नया चित्र अपलोड करें (Add Image)
        </button>
      </div>

      {/* SECTION 3: Live Masonry Column List Grid Preview */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
        <AnimatePresence>
          {images.map((img, index) => (
            <motion.div
              key={img.id || index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="break-inside-avoid mb-5 bg-white border border-saffron/10 rounded-2xl overflow-hidden shadow-sm group relative"
            >
              <img
                src={img.image}
                alt={`Gallery node #${img.id}`}
                className="w-full object-cover aspect-4/3 h-auto max-h-72 min-h-[12rem] bg-gray-100"
              />

              {/* Action Operations Hover Sheet overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 z-10">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full font-mono">
                    ID: #{img.id || index + 1}
                  </span>
                  <span className="text-[10px] bg-saffron text-white px-2.5 py-1 rounded-full">
                    स्थान: {index + 1}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full mt-auto">
                  <button
                    onClick={() => setPreviewImage(img.image)}
                    className="flex-1 flex items-center justify-center gap-1 bg-white text-darkbrown py-2 rounded-xl text-xs font-semibold hover:bg-saffron hover:text-white transition-colors"
                  >
                    <Eye size={12} /> देखें
                  </button>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 transition-colors"
                    title="तस्वीर हटाएं"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* MODAL 1: Upload / Add Asset Link */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden border border-saffron/20"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                <h2 className="text-lg font-bold text-darkbrown flex items-center gap-2">
                  <ImageIcon size={18} className="text-saffron" /> नया वेब चित्र जोड़ें
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 text-gray-400">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-brown flex items-center gap-1 mb-1.5">
                    <Link2 size={14} /> इमेज URL (Web Image Address) *
                  </label>
                  <input
                    type="url"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-xs font-mono bg-gray-50/50"
                    placeholder="https://example.com/pujaphoto.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  />
                </div>

                {/* Live Sandbox Input Render Checker */}
                {formData.imageUrl.trim() && (
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
                    <span className="text-[10px] text-gray-400 font-bold block mb-1">लाइव प्रीव्यू (Live Dynamic Check):</span>
                    <img 
                      src={formData.imageUrl} 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=600"; }}
                      alt="Preview container" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-50 text-xs font-medium">
                    रद्द करें
                  </button>
                  <button type="submit" className="bg-saffron text-white px-5 py-2 rounded-xl text-xs font-medium hover:bg-saffron/90 flex items-center gap-1 shadow-md">
                    <Check size={14} /> गैलरी में जोड़ें
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Full-screen Image Lightbox Preview */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm">
            <button onClick={() => setPreviewImage(null)} className="absolute top-6 right-6 text-white hover:text-saffron transition-colors z-[130]">
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
                alt="Full preview item"
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