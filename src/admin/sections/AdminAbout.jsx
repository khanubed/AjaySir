import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { 
  Type, FileText, Image as ImageIcon, Plus, Trash2, Check, 
  RotateCcw, Compass, Award, Upload, Loader2 
} from "lucide-react";

// Using the custom api instance for automatic baseURL and Auth headers
import api from "../../api/axios.js";
// Fallback data for safety
import { getAboutData } from "../../data/about.js";

export const AdminAbout = () => {
  const [formData, setFormData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // --- 1. Fetch Content from Backend ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // BaseURL and interceptors handled by custom api instance
        const res = await api.get("/content/about");
        
        if (res.data?.data?.values) {
          setFormData(res.data.data.values);
        } else {
          setFormData(getAboutData()); // Fallback to local JS if data is empty
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setFormData(getAboutData());
        toast.error("Could not load data from server. Offline mode active.");
      }
    };
    fetchData();
  }, []);

  // --- 2. Image Upload Handler (Cloudinary) ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    try {
      setIsUploading(true);
      const res = await api.post("/upload", uploadFormData);
      
      if (res.data.imageUrl) {
        setFormData(prev => ({ ...prev, image: res.data.imageUrl }));
        toast.success("Profile image updated!");
      }
    } catch (err) {
      toast.error("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  // --- 3. Field Handlers ---
  const handleInputChange = (field, value, nestedKey = null) => {
    setFormData((prev) => {
      if (nestedKey) {
        return { ...prev, [nestedKey]: { ...prev[nestedKey], [field]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleArrayChange = (index, value, arrayName) => {
    setFormData((prev) => {
      const updated = [...prev[arrayName]];
      updated[index] = value;
      return { ...prev, [arrayName]: updated };
    });
  };

  // --- 4. Save to Database ---
  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // toast.promise handles the loading/success/error UI state
    const savePromise = api.put("/content/about", formData);

    toast.promise(savePromise, {
      loading: 'Saving changes to database...',
      success: 'Profile updated successfully!',
      error: 'Error saving data. Please check your connection.',
    });
  };

  if (!formData) return (
    <div className="flex items-center justify-center min-h-screen text-saffron">
      <Loader2 className="animate-spin mr-2" /> Loading content...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffaf3] p-4 md:p-8 text-darkbrown">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-saffron/20 p-6 rounded-[2rem] shadow-sm gap-4 sticky top-4 z-50 backdrop-blur-md bg-white/90">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Award className="text-saffron" /> प्रोफ़ाइल प्रबंधन
            </h1>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-brown/10 py-2.5 px-4 rounded-xl text-xs font-bold"
            >
              <RotateCcw size={14} /> रीसेट
            </button>
            <button
              onClick={handleFormSubmit}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-saffron text-white py-2.5 px-6 rounded-xl text-xs font-bold shadow-lg shadow-saffron/20"
            >
              <Check size={14} /> बदलाव सहेजें
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Image & Stats */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white border border-saffron/10 rounded-[2rem] p-5 shadow-sm">
              <h3 className="text-xs font-bold text-saffron mb-4 flex items-center gap-2 uppercase tracking-wider">
                <ImageIcon size={14} /> प्रोफाइल फोटो
              </h3>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="relative group aspect-[2/3] rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-saffron/20 cursor-pointer"
              >
                {isUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                    <Loader2 className="animate-spin text-saffron" />
                  </div>
                ) : null}
                <img src={formData.image} className="w-full h-full object-cover transition group-hover:scale-105" alt="Pandit Ji" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="text-white" size={24} />
                </div>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
              </div>
            </div>

            <div className="bg-white border border-saffron/10 rounded-[2rem] p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-saffron mb-2 uppercase tracking-wider flex items-center gap-2">
                <Type size={14} /> सांख्यिकी (Stats)
              </h3>
              <div>
                <label className="text-[10px] font-bold text-gray-400 ml-1">अनुभव (Years)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-mono mt-1"
                  value={formData.stats.count}
                  onChange={(e) => handleInputChange("count", e.target.value, "stats")}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 ml-1">लेबल</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50/50 text-sm mt-1"
                  value={formData.stats.label}
                  onChange={(e) => handleInputChange("label", e.target.value, "stats")}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Main Content */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Titles Block */}
            <div className="bg-white border border-saffron/10 rounded-[2rem] p-6 shadow-sm space-y-4">
               <h3 className="text-xs font-bold text-saffron mb-2 uppercase tracking-wider flex items-center gap-2">
                <FileText size={14} /> मुख्य शीर्षक
              </h3>
              <input
                type="text"
                placeholder="Top Tag (e.g. अध्यात्म एवं परंपरा)"
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-bold"
                value={formData.topTag}
                onChange={(e) => handleInputChange("topTag", e.target.value)}
              />
              <textarea
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-semibold resize-none"
                value={formData.mainHeading}
                onChange={(e) => handleInputChange("mainHeading", e.target.value)}
              />
            </div>

            {/* Paragraphs Block */}
            <div className="bg-white border border-saffron/10 rounded-[2rem] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xs font-bold text-saffron uppercase tracking-wider flex items-center gap-2">
                  <Plus size={14} /> विवरण (About)
                </h3>
                <button 
                  onClick={() => setFormData(p => ({ ...p, paragraphs: [...p.paragraphs, ""] }))}
                  className="p-1.5 bg-darkbrown text-white rounded-lg hover:bg-black transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="space-y-3">
                {formData.paragraphs.map((p, i) => (
                  <div key={i} className="flex gap-2 group">
                    <textarea
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm min-h-[80px]"
                      value={p}
                      onChange={(e) => handleArrayChange(i, e.target.value, "paragraphs")}
                    />
                    <button 
                      onClick={() => setFormData(prev => ({ ...prev, paragraphs: prev.paragraphs.filter((_, idx) => idx !== i) }))}
                      className="p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity self-start"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Block */}
            <div className="bg-white border border-saffron/10 rounded-[2rem] p-6 shadow-sm space-y-4">
               <h3 className="text-xs font-bold text-saffron mb-2 uppercase tracking-wider flex items-center gap-2">
                <Compass size={14} /> हमारा पावन उद्देश्य
              </h3>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-bold"
                value={formData.mission.heading}
                onChange={(e) => handleInputChange("heading", e.target.value, "mission")}
              />
              <textarea
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm resize-none leading-relaxed"
                value={formData.mission.description}
                onChange={(e) => handleInputChange("description", e.target.value, "mission")}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;