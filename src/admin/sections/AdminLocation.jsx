import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Save, RotateCcw, Check, Globe, HelpCircle, FileText } from "lucide-react";
import { getLiveLocationData, saveLiveLocationData } from "../../data/locationData.js";

export default function AdminLocation() {
  const [locationData, setLocationData] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setLocationData(getLiveLocationData());
  }, []);

  if (!locationData) return <div className="p-8 text-center text-brown">लोड हो रहा है...</div>;

  const handleChange = (field, value) => {
    setLocationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveLiveLocationData(locationData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("क्या आप बदलावों को रद्द करके पुराना सुरक्षित डेटा वापस लाना चाहते हैं?")) {
      setLocationData(getLiveLocationData());
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] p-4 md:p-8 text-darkbrown font-sans">
      
      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold"
          >
            <Check size={18} /> लोकेशन सेक्शन का डेटा सुरक्षित कर दिया गया है!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-saffron/20 p-6 rounded-3xl shadow-sm gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-darkbrown flex items-center gap-2">
              <MapPin className="text-saffron" /> लोकेशन और मैप प्रबंधन (Location Admin)
            </h1>
            <p className="text-xs text-brown/60 mt-0.5">यहां से आप मुख्य हेडलाइंस और गूगल मैप का लाइव एम्बेड (Embed) लिंक बदल सकते हैं।</p>
          </div>
          <div className="flex gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border border-brown/20 hover:bg-gray-50 text-brown font-semibold py-2 px-4 rounded-xl text-xs transition"
            >
              <RotateCcw size={14} /> रीसेट
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-saffron text-white font-semibold py-2 px-5 rounded-xl text-xs shadow-md hover:bg-saffron/90 transition"
            >
              <Save size={14} /> सेव करें
            </button>
          </div>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Headings & Text */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-saffron uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <FileText size={16} /> हेडर और मुख्य टेक्स्ट विवरण
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1.5">टॉप टैग (Small Top Tag)</label>
                <input
                  type="text"
                  value={locationData.topTag}
                  onChange={(e) => handleChange("topTag", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                  placeholder="Service Location"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1.5">मुख्य हेडिंग (Main Heading)</label>
                <input
                  type="text"
                  value={locationData.mainHeading}
                  onChange={(e) => handleChange("mainHeading", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                  placeholder="समग्र इंदौर और निकटवर्ती क्षेत्रों में वैदिक सेवाएं उपलब्ध"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brown/80 mb-1.5">लंबा विवरण (Main Description)</label>
              <textarea
                rows={3}
                value={locationData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none"
                placeholder="क्षेत्रों का विवरण यहाँ लिखें..."
              />
            </div>
          </div>

          {/* Section 2: Google Map Integration */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-saffron uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <Globe size={16} /> इंटरएक्टिव गूगल मैप (Google Map Embed Link)
            </h3>

            <div>
              <label className="block text-xs font-bold text-brown/80 mb-1.5">गूगल मैप `src` यूआरएल (Map Embed URL)</label>
              <input
                type="text"
                value={locationData.mapEmbedUrl}
                onChange={(e) => handleChange("mapEmbedUrl", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-xs bg-gray-50/50 font-mono text-blue-600"
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
              <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2 items-start">
                <HelpCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-amber-800 leading-normal">
                  <strong>लिंक कैसे निकालें:</strong> Google Maps पर अपना स्थान खोजें ➔ <strong>Share</strong> बटन पर क्लिक करें ➔ <strong>Embed a map</strong> टैब चुनें ➔ <strong>Copy HTML</strong> करें, और केवल कोटेशन के अंदर का <code>src="..."</code> वाला हिस्सा यहाँ पेस्ट करें।
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Floating Card Details */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-saffron uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <MapPin size={16} /> मैप के ऊपर तैरता हुआ कार्ड (Floating Info Card)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1.5">कार्ड छोटा टैग (Card Tag)</label>
                <input
                  type="text"
                  value={locationData.cardTag}
                  onChange={(e) => handleChange("cardTag", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                  placeholder="मुख्य केंद्र"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1.5">कार्ड मुख्य शीर्षक (Card Heading)</label>
                <input
                  type="text"
                  value={locationData.cardHeading}
                  onChange={(e) => handleChange("cardHeading", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                  placeholder="इन्दौर, मध्य प्रदेश"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brown/80 mb-1.5">कार्ड विवरण (Card Description)</label>
              <textarea
                rows={3}
                value={locationData.cardDescription}
                onChange={(e) => handleChange("cardDescription", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none"
                placeholder="बाहरी राज्यों या यात्रा अनुष्ठान की जानकारी..."
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-[#4a1d00] to-darkbrown text-white font-bold py-2.5 px-8 rounded-xl text-sm shadow-md hover:opacity-95 transition"
            >
              <Save size={16} /> लोकेशन सेव करें
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}   