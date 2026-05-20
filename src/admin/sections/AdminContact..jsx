import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock3, MessageSquare, Save, RotateCcw, Check, ShieldCheck } from "lucide-react";
import { getContactConfig, saveContactConfig } from "../../data/contact.js";

export default function AdminContact() {
  const [config, setConfig] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setConfig(getContactConfig());
  }, []);

  if (!config) return <div className="p-8 text-center text-brown">लोड हो रहा है...</div>;

  const handleChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveContactConfig(config);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("क्या आप बदलावों को रद्द करके पुराना सुरक्षित डेटा वापस लाना चाहते हैं?")) {
      setConfig(getContactConfig());
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] p-4 md:p-8 text-darkbrown font-sans">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold"
          >
            <Check size={18} /> संपर्क जानकारी सुरक्षित कर दी गई है!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-saffron/20 p-6 rounded-3xl shadow-sm gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-darkbrown flex items-center gap-2">
              <ShieldCheck className="text-saffron" /> संपर्क केंद्र प्रबंधन (Contact Admin)
            </h1>
            <p className="text-xs text-brown/60 mt-0.5">यहां से आप वेबसाइट पर दिखने वाले फोन नंबर, व्हाट्सएप और पते बदल सकते हैं।</p>
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
        <form onSubmit={handleSave} className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-6">
          
          {/* Calling Numbers & WhatsApp */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-saffron uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <Phone size={16} /> कॉलिंग और व्हाट्सएप कम्युनिकेशन
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1.5">दिखने वाला फ़ोन नंबर</label>
                <input
                  type="text"
                  value={config.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                  placeholder="+91 9589547529"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1.5">व्हाट्सएप नंबर (बिना स्पेस या '+' के केवल अंक)</label>
                <input
                  type="text"
                  value={config.whatsapp}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 font-mono"
                  placeholder="919589547529"
                />
                <span className="text-[10px] text-gray-400 block mt-1">लिंक को सही तरीके से काम करने के लिए देश का कोड (जैसे 91) अवश्य शामिल करें।</span>
              </div>
            </div>
          </div>

          {/* Online Presence & Location */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-saffron uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <MapPin size={16} /> पता और उपलब्धता विवरण
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1.5">ईमेल पता (Email Address)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3 text-gray-400" size={16} />
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                    placeholder="vedicservices@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1.5">स्थान / ऑफिस का पता (Location)</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={config.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                    placeholder="इन्दौर, मध्य प्रदेश, भारत"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brown/80 mb-1.5">उपलब्धता का समय (Timing / Availability)</label>
                <div className="relative">
                  <Clock3 className="absolute left-4 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={config.timing}
                    onChange={(e) => handleChange("timing", e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron text-sm bg-gray-50/50"
                    placeholder="सोमवार से रविवार (सप्ताह के सभी दिन)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-[#4a1d00] to-darkbrown text-white font-bold py-2.5 px-8 rounded-xl text-sm shadow-md hover:opacity-95 transition"
            >
              <Save size={16} /> बदलाव सुरक्षित करें
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}