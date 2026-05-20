import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Type, 
  FileText, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Check, 
  RotateCcw, 
  Compass, 
  Award 
} from "lucide-react";
import { getAboutData, saveAboutData } from "../../data/about.js";

export const AdminAbout = () => {
  const [formData, setFormData] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // माउंट होने पर डेटा लोड करें
  useEffect(() => {
    setFormData(getAboutData());
  }, []);

  if (!formData) {
    return <div className="p-8 text-center text-brown font-medium">लोड हो रहा है...</div>;
  }

  // टेक्स्ट फ़ील्ड्स को हैंडल करने के लिए
  const handleInputChange = (field, value, nestedKey = null) => {
    setFormData((prev) => {
      if (nestedKey) {
        return {
          ...prev,
          [nestedKey]: { ...prev[nestedKey], [field]: value }
        };
      }
      return { ...prev, [field]: value };
    });
  };

  // डायनेमिक एरे (Paragraphs / Highlights) को हैंडल करने के लिए
  const handleArrayElementChange = (index, value, arrayName) => {
    setFormData((prev) => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index] = value;
      return { ...prev, [arrayName]: updatedArray };
    });
  };

  const addArrayElement = (arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""]
    }));
  };

  const removeArrayElement = (index, arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  // डेटा सुरक्षित (Save) करें
  const handleFormSubmit = (e) => {
    e.preventDefault();
    saveAboutData(formData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // बदलावों को रीसेट करें
  const handleFormReset = () => {
    if (window.confirm("क्या आप सभी अस्थायी बदलावों को रद्द करके पुराना डेटा वापस लाना चाहते हैं?")) {
      setFormData(getAboutData());
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] p-4 md:p-8 text-darkbrown font-sans">
      
      {/* सफलता का संदेश (Toast Notification) */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[150] bg-green-600 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold"
          >
            <Check size={18} /> बदलाव सफलतापूर्वक सहेज लिए गए हैं!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* मुख्य हेडर और कंट्रोल बार */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-saffron/20 p-6 rounded-3xl shadow-sm gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-darkbrown flex items-center gap-2">
              <Award className="text-saffron" /> 'About' सेक्शन प्रबंधन (Profile Customization)
            </h1>
            <p className="text-xs text-brown/60 mt-0.5">
              वेबसाइट के 'पंडित जी के बारे में' सेक्शन की इमेज, टेक्स्ट, मुख्य बिंदु और उद्देश्य बदलें।
            </p>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleFormReset}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border border-brown/20 hover:bg-gray-50 text-brown font-semibold py-2.5 px-4 rounded-xl text-xs transition"
            >
              <RotateCcw size={14} /> रीसेट करें
            </button>
            <button
              type="button"
              onClick={handleFormSubmit}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-saffron text-white font-semibold py-2.5 px-5 rounded-xl text-xs shadow-md hover:bg-saffron/90 transition"
            >
              <Check size={14} /> डेटा सेव करें
            </button>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-8">
          
          {/* ब्लॉक 1: हेडर एवं अनुभव काउंटर */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-saffron flex items-center gap-1.5 border-b border-gray-100 pb-3">
              <Type size={16} /> 1. मुख्य शीर्षक एवं सांख्यिकी (Titles & Stats Counter)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1">छोटा ऊपरी एक्सेंट टैग (Top Tag)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                  value={formData.topTag}
                  onChange={(e) => handleInputChange("topTag", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brown/80 mb-1">अनुभव संख्या (Count)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 font-mono"
                    value={formData.stats.count}
                    onChange={(e) => handleInputChange("count", e.target.value, "stats")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brown/80 mb-1">काउंटर लेबल (Label)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                    value={formData.stats.label}
                    onChange={(e) => handleInputChange("label", e.target.value, "stats")}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-brown/80 mb-1">मुख्य बड़ी हेडिंग (Main Heading)</label>
              <textarea
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none"
                value={formData.mainHeading}
                onChange={(e) => handleInputChange("mainHeading", e.target.value)}
              />
            </div>
          </div>

          {/* ब्लॉक 2: पंडित जी की फोटो प्रोफाइल */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-saffron flex items-center gap-1.5 border-b border-gray-100 pb-3">
              <ImageIcon size={16} /> 2. मुख्य चित्र (Profile Image)
            </h3>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-24 h-32 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
                <img 
                  src={formData.image || "https://www.shutterstock.com/image-photo/hindu-indian-pandit-looking-front-260nw-2626343377.jpg"} 
                  alt="Pandit Ji Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <label className="block text-xs font-bold text-brown/80 mb-1">इमेज URL लिंक (Profile Image URL)</label>
                <input
                  type="url"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-xs font-mono bg-gray-50/50"
                  placeholder="https://example.com/pandit-ji.jpg"
                  value={formData.image || ""}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                />
                <span className="text-[10px] text-gray-400 block mt-1">वेबसाइट पर सही रेंडरिंग के लिए हाई-क्वालिटी वर्टिकल (Aspect 2:3) इमेज लिंक डालें।</span>
              </div>
            </div>
          </div>

          {/* ब्लॉक 3: विवरण पैराग्राफ्स सूची (Dynamic Inputs) */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-saffron flex items-center gap-1.5">
                <FileText size={16} /> 3. विस्तृत विवरण पैराग्राफ्स (About Paragraphs)
              </h3>
              <button
                type="button"
                onClick={() => addArrayElement("paragraphs")}
                className="flex items-center gap-1 text-[11px] bg-darkbrown text-white font-semibold px-3 py-1.5 rounded-xl hover:bg-darkbrown/90 transition shadow-sm"
              >
                <Plus size={12} /> नया पैराग्राफ जोड़ें
              </button>
            </div>
            <div className="space-y-3">
              {formData.paragraphs.map((para, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <span className="bg-gray-100 text-darkbrown font-mono text-xs w-7 h-7 flex items-center justify-center rounded-lg mt-3 shrink-0">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none"
                    value={para}
                    onChange={(e) => handleArrayElementChange(idx, e.target.value, "paragraphs")}
                    placeholder="विवरण की नई पंक्ति यहाँ लिखें..."
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayElement(idx, "paragraphs")}
                    className="p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl mt-1.5 transition shrink-0 border border-red-100"
                    title="हटाएं"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ब्लॉक 4: मुख्य विशेषताएं चेकलिस्ट */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-saffron flex items-center gap-1.5">
                <Check size={16} /> 4. मुख्य विशेषताएं (Highlights Checklist)
              </h3>
              <button
                type="button"
                onClick={() => addArrayElement("highlights")}
                className="flex items-center gap-1 text-[11px] bg-darkbrown text-white font-semibold px-3 py-1.5 rounded-xl hover:bg-darkbrown/90 transition shadow-sm"
              >
                <Plus size={12} /> विशेषता जोड़ें
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formData.highlights.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-gray-50/40 p-1.5 rounded-xl border border-gray-100">
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-saffron text-xs bg-white"
                    value={item}
                    onChange={(e) => handleArrayElementChange(idx, e.target.value, "highlights")}
                    placeholder="जैसे: शुद्धता और स्पष्ट मंत्रोच्चार..."
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayElement(idx, "highlights")}
                    className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg transition shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ब्लॉक 5: हमारा पावन उद्देश्य कार्ड (Mission Block) */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-saffron flex items-center gap-1.5 border-b border-gray-100 pb-3">
              <Compass size={16} /> 5. मिशन और पावन उद्देश्य (Our Sacred Mission)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1">उद्देश्य टैग (Mission Tag)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                  value={formData.mission.tag}
                  onChange={(e) => handleInputChange("tag", e.target.value, "mission")}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1">उद्देश्य हेडिंग (Mission Heading)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                  value={formData.mission.heading}
                  onChange={(e) => handleInputChange("heading", e.target.value, "mission")}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-brown/80 mb-1">विस्तृत उद्देश्य विवरण (Mission Description)</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none text-justify leading-relaxed"
                value={formData.mission.description}
                onChange={(e) => handleInputChange("description", e.target.value, "mission")}
              />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminAbout;