import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Save,
  RotateCcw,
  Check,
  ShieldCheck,
  Loader2,
  Globe,
} from "lucide-react";

// Use the custom api instance for baseURL and Auth headers
import api from "../../api/axios.js";
// Fallback data loading (Local file)
import { getContactConfig } from "../../data/contact.js";

export default function AdminContact() {
  const [config, setConfig] = useState(null);
  const [isSyncing, setIsSyncing] = useState(true);

  // --- 1. Fetch Contact Info from Backend ---
  useEffect(() => {
    const fetchContact = async () => {
      try {
        // BaseURL handled by interceptor
        const res = await api.get("/content/contact");
        if (res.data?.data?.values) {
          setConfig(res.data.data.values);
        } else {
          setConfig(getContactConfig());
        }
      } catch (err) {
        console.warn("Backend fetch failed, using local data.");
        setConfig(getContactConfig());
      } finally {
        setIsSyncing(false);
      }
    };
    fetchContact();
  }, []);

  const handleChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  // --- 2. Save Data to Backend ---
  const handleSave = async (e) => {
    if (e) e.preventDefault();

    const savePromise = api.put("/content/contact", config);

    toast.promise(savePromise, {
      loading: "Updating contact information...",
      success: <b>Information saved successfully!</b>,
      error: <b>Update failed. Check your connection.</b>,
    });
  };

  // --- 3. Reset Handler (Re-fetch original data) ---
  const handleReset = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Discard all unsaved changes?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-xs px-3 py-1 text-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const original = await api.get("/content/contact");
                  setConfig(original.data?.data?.values || getContactConfig());
                  toast.success("Data reset to server version");
                } catch (error) {
                  toast.error("Failed to reset data");
                }
              }}
              className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold"
            >
              Yes, Reset
            </button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  if (isSyncing)
    return (
      <div className="flex items-center justify-center min-h-screen text-saffron bg-[#fffaf3]">
        <Loader2 className="animate-spin mr-2" /> Loading configuration...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fffaf3] p-4 md:p-8 text-darkbrown font-sans">
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-saffron/20 p-6 rounded-[2rem] shadow-sm gap-4 sticky top-4 z-40 backdrop-blur-md bg-white/90">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-darkbrown flex items-center gap-2">
              <ShieldCheck className="text-saffron" /> संपर्क केंद्र प्रबंधन
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-brown/50 font-bold mt-1">
              Contact Center Settings
            </p>
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

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: Primary Communication */}
          <div className="bg-white border border-saffron/10 rounded-[2rem] p-8 shadow-sm space-y-6">
            <h3 className="text-xs font-black text-saffron uppercase tracking-[2px] flex items-center gap-2">
              <Phone size={16} /> कॉलिंग और व्हाट्सएप
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-brown/60 ml-1">
                  दिखने वाला फ़ोन नंबर
                </label>
                <div className="relative group">
                  <Phone
                    className="absolute left-4 top-3.5 text-gray-300 group-focus-within:text-saffron transition-colors"
                    size={16}
                  />
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/5 text-sm bg-gray-50/50 font-semibold transition-all"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-brown/60 ml-1">
                  व्हाट्सएप (Direct API)
                </label>
                <div className="relative group">
                  <Globe
                    className="absolute left-4 top-3.5 text-gray-300 group-focus-within:text-saffron transition-colors"
                    size={16}
                  />
                  <input
                    type="text"
                    value={config.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/5 text-sm bg-gray-50/50 font-mono transition-all"
                    placeholder="91XXXXXXXXXX"
                  />
                </div>
                <p className="text-[10px] text-brown/40 italic ml-1">
                  *बिना '+' या स्पेस के लिखें (e.g. 919589...)
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Physical & Online Info */}
          <div className="bg-white border border-saffron/10 rounded-[2rem] p-8 shadow-sm space-y-6">
            <h3 className="text-xs font-black text-saffron uppercase tracking-[2px] flex items-center gap-2">
              <MapPin size={16} /> लोकेशन और टाइमिंग
            </h3>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-brown/60 ml-1">
                  ईमेल एड्रेस
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-3.5 text-gray-300"
                    size={16}
                  />
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 font-medium"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-brown/60 ml-1">
                  ऑफिस का पता
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-3.5 text-gray-300"
                    size={16}
                  />
                  <input
                    type="text"
                    value={config.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 font-medium"
                    placeholder="City, State, India"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-brown/60 ml-1">
                  उपलब्धता (Timing)
                </label>
                <div className="relative">
                  <Clock3
                    className="absolute left-4 top-3.5 text-gray-300"
                    size={16}
                  />
                  <input
                    type="text"
                    value={config.timing}
                    onChange={(e) => handleChange("timing", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 font-medium"
                    placeholder="24/7 Available or Mon-Sat"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end pb-10">
            <button
              type="submit"
              className="group flex items-center gap-3 bg-darkbrown text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95"
            >
              <Save
                size={18}
                className="group-hover:rotate-12 transition-transform"
              />
              डेटाबेस अपडेट करें
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
