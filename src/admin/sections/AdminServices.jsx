import React, { useState, useEffect, useRef } from "react";

import { 
  Sparkles, ShieldCheck, HeartHandshake, Flame, Users, Orbit, 
  Baby, BookOpen, FlameKindling, Home, Stars, HeartPulse,
  Plus, Trash2, Edit3, Loader2, X, Upload
} from "lucide-react";

// स्थानीय डेटा (डेटाबेस खाली होने पर बैकअप के लिए)
import { services as fallbackServices } from "../../data/services.js";

// हमारा नया इंटरसेप्टर वाला एक्सियोस इंस्टेंस
import api from "../../api/axios.js";

const iconMap = {
  Sparkles, ShieldCheck, HeartHandshake, Flame, Users, Orbit,
  Baby, BookOpen, FlameKindling, Home, Stars, HeartPulse,
};

export default function AdminServices({ onSave }) {
  const [services, setServices] = useState(fallbackServices);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false); // इमेज अपलोड होने की स्थिति
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  const fileInputRef = useRef(null); // छिपे हुए फाइल इनपुट के लिए रेफ (Ref)

  const [formData, setFormData] = useState({
    titleHindi: "",
    titleEnglish: "",
    description: "",
    icon: "Sparkles",
    imageUrl: "",
  });

  // १. डेटाबेस से सेवाएं लाना (FETCH DATA)
  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        //baseURL पहले से सेट है, इसलिए पूरा URL लिखने की ज़रूरत नहीं है
        const response = await api.get(`/content/services`);
        if (response.data.success && response.data.data?.values) {
          setServices(response.data.data.values);
        }
      } catch (error) {
        console.error("सेवाओं का डेटा लाने में त्रुटि:", error);
        setServices(fallbackServices);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServicesData();
  }, []);

  // २. इमेज अपलोड हैंडलर (Cloudinary के लिए नए API का उपयोग)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // फाइल का साइज चेक करना (2MB से ज्यादा नहीं होना चाहिए)
    if (file.size > 2 * 1024 * 1024) {
      alert("फाइल का आकार 2MB से कम होना चाहिए");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      setIsUploading(true);
      // नए 'api' इंस्टेंस का उपयोग, यह हेडर में टोकन अपने आप भेज देगा
      const res = await api.post('/upload', uploadData);
      if (res.data.success) {
        setFormData(prev => ({ ...prev, imageUrl: res.data.imageUrl }));
        if (onSave) onSave("फोटो सफलतापूर्वक अपलोड हो गई!");
      }
    } catch (err) {
      console.error("इमेज अपलोड विफल:", err);
      alert("इमेज अपलोड करने में समस्या आई। कृपया पुनः प्रयास करें।");
    } finally {
      setIsUploading(false);
    }
  };

  // ३. लाइव डेटाबेस के साथ डेटा सिंक करना
  const syncWithDatabase = async (updatedList) => {
    try {
      // पुराने 'axios.put' को हटाकर नए 'api.put' का उपयोग किया गया है
      const response = await api.put('/content/services', updatedList);
      if (response.data.success && onSave) {
        onSave("सेवाएं लाइव डेटाबेस पर अपडेट हो गई हैं!");
      }
    } catch (error) {
      console.error("डेटाबेस सिंक विफल:", error);
      if (onSave) onSave("डेटाबेस सिंक विफल रहा।");
    }
  };

  // नया फॉर्म खोलने के लिए हैंडलर
  const handleCreateOpen = () => {
    setEditingService(null);
    setFormData({ titleHindi: "", titleEnglish: "", description: "", icon: "Sparkles", imageUrl: "" });
    setIsModalOpen(true);
  };

  // फॉर्म सबमिट (सेव या अपडेट) करने का लॉजिक
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return alert("कृपया इमेज अपलोड होने तक प्रतीक्षा करें।");

    let updatedServices;
    if (editingService) {
      // अगर पहले से मौजूद सर्विस को एडिट कर रहे हैं
      updatedServices = services.map((item) =>
        item.id === editingService.id ? { ...item, ...formData } : item
      );
    } else {
      // अगर नई सर्विस जोड़ रहे हैं, तो नई आईडी जनरेट करना
      const newService = {
        id: services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1,
        ...formData,
      };
      updatedServices = [...services, newService];
    }

    setServices(updatedServices);
    setIsModalOpen(false);
    await syncWithDatabase(updatedServices); // बदलावों को सीधे डेटाबेस में सिंक करें
  };

  // सर्विस डिलीट करने का हैंडलर
  const handleDelete = async (id) => {
    if (window.confirm("क्या आप इस सर्विस को हटाना चाहते हैं?")) {
      const updated = services.filter((item) => item.id !== id);
      setServices(updated);
      await syncWithDatabase(updated); // डिलीट के बाद डेटाबेस सिंक करें
    }
  };

  // लोडिंग स्क्रीन
  if (isLoading) return <div className="flex justify-center py-20 text-saffron"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8 pb-12">
      {/* हेडर सेक्शन */}
      <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
        <h3 className="text-2xl font-bold text-darkbrown amita-bold flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-saffron" /> सेवा प्रबंधन
        </h3>
        <button onClick={handleCreateOpen} className="bg-saffron text-[#240a00] px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" /> नई सेवा जोड़ें
        </button>
      </div>

      {/* सेवाओं की ग्रिड लिस्ट */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Sparkles;
          return (
            <div key={service.id} className="bg-[#240a00] border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-lg">
              <div className="h-40 relative bg-black/40">
                <img src={service.imageUrl || "https://via.placeholder.com/400x300?text=No+Image"} alt="" className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-3 right-3 bg-saffron text-[#240a00] p-2 rounded-xl"><Icon className="w-4 h-4" /></div>
              </div>
              <div className="p-5">
                <h5 className="text-lg font-bold text-cream amita-bold">{service.titleHindi}</h5>
                <p className="text-xs text-[#f3d9b1]/70 line-clamp-2 mt-2">{service.description}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => { setEditingService(service); setFormData(service); setIsModalOpen(true); }} className="flex-1 border border-saffron/30 text-saffron py-2 rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-saffron/10 transition-all"><Edit3 size={14}/> Edit</button>
                  <button onClick={() => handleDelete(service.id)} className="bg-red-500/10 text-red-400 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* नया/एडिट करने का पॉपअप (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#240a00] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-white/5 flex justify-between items-center text-saffron font-bold">
              <span>{editingService ? "सेवा संपादित करें" : "नई वैदिक सेवा"}</span>
              <X className="cursor-pointer" onClick={() => setIsModalOpen(false)} />
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* इमेज अपलोड करने का मुख्य सेक्शन */}
              <div className="space-y-2">
                <label className="text-xs text-[#f3d9b1]/70 block">सेवा की फोटो (Upload Image)</label>
                <div className="relative group overflow-hidden rounded-xl border-2 border-dashed border-white/10 h-32 flex items-center justify-center bg-white/5">
                  {formData.imageUrl ? (
                    <>
                      <img src={formData.imageUrl} className="w-full h-full object-cover opacity-60" alt="Preview" />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                         <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 bg-saffron text-darkbrown rounded-full"><Upload size={16}/></button>
                         <button type="button" onClick={() => setFormData({...formData, imageUrl: ""})} className="p-2 bg-red-500 text-white rounded-full"><Trash2 size={16}/></button>
                      </div>
                    </>
                  ) : (
                    <button type="button" onClick={() => fileInputRef.current.click()} className="flex flex-col items-center gap-2 text-[#f3d9b1]/40 hover:text-saffron transition-colors">
                      {isUploading ? <Loader2 className="animate-spin" /> : <Upload size={24} />}
                      <span className="text-xs">{isUploading ? "अपलोड हो रहा है..." : "फोटो चुनें"}</span>
                    </button>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
                <input type="text" placeholder="या इमेज URL यहाँ पेस्ट करें" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-[10px] text-cream outline-none font-mono" />
              </div>

              {/* टाइटल्स इनपुट */}
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Hindi Title" required value={formData.titleHindi} onChange={(e) => setFormData({...formData, titleHindi: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-cream text-sm outline-none focus:border-saffron/50" />
                <input type="text" placeholder="English Title" required value={formData.titleEnglish} onChange={(e) => setFormData({...formData, titleEnglish: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-cream text-sm outline-none focus:border-saffron/50" />
              </div>

              {/* आइकॉन चुनने का ड्रापडाउन */}
              <div className="space-y-1">
                <label className="text-[10px] text-saffron uppercase tracking-widest">Icon Selection</label>
                <select value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} className="w-full bg-[#1c0800] border border-white/10 rounded-xl p-3 text-cream text-sm outline-none">
                  {Object.keys(iconMap).map(ico => <option key={ico} value={ico}>{ico}</option>)}
                </select>
              </div>

              {/* विवरण (Description) */}
              <textarea rows="3" placeholder="सेवा का विस्तृत विवरण..." required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-cream text-sm outline-none focus:border-saffron/50" />

              {/* बटन्स */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-cream text-sm">रद्द करें</button>
                <button type="submit" disabled={isUploading} className="flex-1 bg-saffron text-[#240a00] py-3 rounded-xl font-bold hover:bg-orange-500 transition-all disabled:opacity-50">
                  {editingService ? "अपडेट करें" : "सुरक्षित करें"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}