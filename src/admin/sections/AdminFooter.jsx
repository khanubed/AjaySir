import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { 
  Layout, Save, RotateCcw, Link2, Quote, MessageSquare, ShieldAlert, Loader2 
} from "lucide-react";

// Fallback data
import { getLiveFooterData } from "../../data/footer.js";
import api from "../../api/axios.js";

export default function AdminFooter() {
  const [footerData, setFooterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const API_URL = "http://localhost:5000/api/content/footer";

  // --- 1. Fetch Footer Data from Backend ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('content/footer');
        if (res.data?.data?.values) {
          setFooterData(res.data.data.values);
        } else {
          setFooterData(getLiveFooterData());
        }
      } catch (err) {
        console.warn("Backend fetch failed, using local fallback.");
        setFooterData(getLiveFooterData());
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTextChange = (field, value) => {
    setFooterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (index, value) => {
    const updatedSocials = [...footerData.socialLinks];
    updatedSocials[index].link = value;
    setFooterData((prev) => ({ ...prev, socialLinks: updatedSocials }));
  };

  // --- 2. Save Both Stats & Reviews to Backend ---
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    
    const savePromise = api.put(`content/footer`, footerData);

    toast.promise(savePromise, {
      loading: 'फुटर अपडेट किया जा रहा है...',
      success: <b>फुटर डेटा सफलतापूर्वक सुरक्षित किया गया!</b>,
      error: <b>सेव करने में समस्या आई।</b>,
    });
  };

  const handleReset = async () => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-darkbrown">क्या आप बदलावों को रद्द करके पुराना डेटा वापस लाना चाहते हैं?</p>
        <div className="flex gap-2 justify-end">
          <button onClick={() => toast.dismiss(t.id)} className="text-xs text-brown px-2 py-1">नहीं</button>
          <button 
            onClick={async () => {
              toast.dismiss(t.id);
              setIsLoading(true);
              try {
                const res = await axios.get(API_URL);
                if (res.data?.data?.values) {
                  setFooterData(res.data.data.values);
                  toast.success("डेटा रिस्टोर हो गया");
                }
              } catch (err) {
                toast.error("रिसेट विफल रहा");
              } finally {
                setIsLoading(false);
              }
            }} 
            className="bg-saffron text-white px-3 py-1 rounded-md text-xs font-bold"
          >
            हाँ, रिस्टोर करें
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen text-saffron bg-[#fffaf3]">
      <Loader2 className="animate-spin mr-2" /> फुटर डेटा सिंक हो रहा है...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffaf3] p-4 md:p-8 text-darkbrown font-sans">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Controls - Sticky for better UX */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-saffron/20 p-6 rounded-3xl shadow-sm gap-4 sticky top-4 z-40 backdrop-blur-md bg-white/90">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-darkbrown flex items-center gap-2">
              <Layout className="text-saffron" /> फुटर प्रबंधन
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-brown/50 font-bold mt-1">Footer & Branding Manager</p>
          </div>
          <div className="flex gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border border-brown/10 hover:bg-gray-50 text-brown font-bold py-2.5 px-5 rounded-xl text-xs transition active:scale-95"
            >
              <RotateCcw size={14} /> रीसेट
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-saffron text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-lg shadow-saffron/20 hover:bg-saffron/90 transition active:scale-95"
            >
              <Save size={14} /> सेव करें
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* SECTION 1: CORE TEXTS */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-saffron uppercase tracking-[2px] flex items-center gap-2 border-b border-gray-50 pb-3">
              <MessageSquare size={16} /> 1. मुख्य ब्रांड विवरण और संदेश
            </h3>
            
            <div>
              <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">मुख्य स्लोगन (Brand Slogan)</label>
              <textarea
                rows={2}
                value={footerData.slogan}
                onChange={(e) => handleTextChange("slogan", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none leading-relaxed font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">फ्लोटिंग कोट्स बॉक्स (Floating Quote)</label>
              <div className="relative">
                <Quote size={16} className="absolute left-3 top-4 text-saffron/30" />
                <textarea
                  rows={2}
                  value={footerData.quote}
                  onChange={(e) => handleTextChange("quote", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none italic leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: SOCIAL NETWORK CONNECTIONS */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-saffron uppercase tracking-[2px] flex items-center gap-2 border-b border-gray-50 pb-3">
              <Link2 size={16} /> 2. सोशल मीडिया हैंडल्स (Social Links)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {footerData.socialLinks.map((social, index) => (
                <div key={index} className="space-y-1.5">
                  <label className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-bold text-brown/40 uppercase tracking-wider">{social.name}</span>
                    {social.name === "WhatsApp" && <span className="text-[9px] text-green-600 font-bold bg-green-50 px-2 rounded-full">Use wa.me</span>}
                  </label>
                  <input
                    type="text"
                    value={social.link}
                    onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-saffron text-xs bg-gray-50/50 text-blue-600 font-mono"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: COPYRIGHT AREA */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-saffron uppercase tracking-[2px] flex items-center gap-2 border-b border-gray-50 pb-3">
              <ShieldAlert size={16} /> 3. कॉपीराइट फुटनोट (Copyright Disclosure)
            </h3>

            <div>
              <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">कॉपीराइट टेक्स्ट (Bottom Text)</label>
              <input
                type="text"
                value={footerData.footerBottomText}
                onChange={(e) => handleTextChange("footerBottomText", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 font-medium"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end pb-12">
            <button
              type="submit"
              className="group flex items-center gap-3 bg-darkbrown text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95"
            >
              <Save size={18} /> फुटर अपडेट करें
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}