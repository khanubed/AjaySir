import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Save, RotateCcw, Check, Link2, Quote, MessageSquare, ShieldAlert } from "lucide-react";
import { getLiveFooterData, saveLiveFooterData } from "../../data/footer.js";

export default function AdminFooter() {
  const [footerData, setFooterData] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFooterData(getLiveFooterData());
  }, []);

  if (!footerData) return <div className="p-8 text-center text-brown">लोड हो रहा है...</div>;

  const handleTextChange = (field, value) => {
    setFooterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (index, value) => {
    const updatedSocials = [...footerData.socialLinks];
    updatedSocials[index].link = value;
    setFooterData((prev) => ({ ...prev, socialLinks: updatedSocials }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveLiveFooterData(footerData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("क्या आप बदलावों को रद्द करके पिछला सुरक्षित डेटा वापस लाना चाहते हैं?")) {
      setFooterData(getLiveFooterData());
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] p-4 md:p-8 text-darkbrown font-sans">
      
      {/* Dynamic Action Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold"
          >
            <Check size={18} /> फुटर का डेटा सफलतापूर्वक सुरक्षित कर दिया गया है!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-saffron/20 p-6 rounded-3xl shadow-sm gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-darkbrown flex items-center gap-2">
              <Layout className="text-saffron" /> फुटर प्रबंधन (Footer Admin Panel)
            </h1>
            <p className="text-xs text-brown/60 mt-0.5">वेबसाइट के निचले हिस्से (Footer) के स्लोगन, कोट्स और सोशल लिंक्स को यहाँ से लाइव बदलें।</p>
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

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* SECTION 1: CORE TEXTS */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-saffron uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <MessageSquare size={16} /> मुख्य ब्रांड विवरण और संदेश
            </h3>
            
            <div>
              <label className="block text-xs font-bold text-brown/80 mb-1.5">मुख्य स्लोगन (Brand Slogan)</label>
              <textarea
                rows={2}
                value={footerData.slogan}
                onChange={(e) => handleTextChange("slogan", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none"
                placeholder="वैदिक परंपराओं के माध्यम से आपके जीवन में..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brown/80 mb-1.5">फ्लोटिंग कोट्स बॉक्स (Floating Quote)</label>
              <div className="relative">
                <Quote size={16} className="absolute left-3 top-3.5 text-brown/30" />
                <textarea
                  rows={2}
                  value={footerData.quote}
                  onChange={(e) => handleTextChange("quote", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none italic"
                  placeholder="“विश्वास, सच्ची भक्ति और पवित्र अनुष्ठान...”"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: SOCIAL NETWORK CONNECTIONS */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-saffron uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <Link2 size={16} /> सोशल मीडिया हैंडल्स (Social Links)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {footerData.socialLinks.map((social, index) => (
                <div key={index}>
                  <label className="block text-xs font-bold text-brown/80 mb-1.5">
                    {social.name} लिंक {social.name === "WhatsApp" && "(wa.me यूआरएल)"}
                  </label>
                  <input
                    type="text"
                    value={social.link}
                    onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-xs bg-gray-50/50 text-blue-600 font-mono"
                    placeholder={`https://${social.name.toLowerCase()}.com/...`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: COPYRIGHT AREA */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-saffron uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <ShieldAlert size={16} /> कॉपीराइट फुटनोट (Copyright Disclosure)
            </h3>

            <div>
              <label className="block text-xs font-bold text-brown/80 mb-1.5">कॉपीराइट टेक्स्ट (Bottom Text)</label>
              <input
                type="text"
                value={footerData.footerBottomText}
                onChange={(e) => handleTextChange("footerBottomText", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                placeholder="© 2026 पंडित जी वैदिक सेवाएं। सर्वाधिकार सुरक्षित।"
              />
            </div>
          </div>

          {/* Form Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-[#4a1d00] to-darkbrown text-white font-bold py-2.5 px-8 rounded-xl text-sm shadow-md hover:opacity-95 transition"
            >
              <Save size={16} /> फुटर अपडेट करें
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}