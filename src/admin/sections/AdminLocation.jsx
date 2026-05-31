import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { 
  MapPin, Save, RotateCcw, Globe, HelpCircle, FileText, Loader2 
} from "lucide-react";

// Use the custom api instance for centralized baseURL and Auth headers
import api from "../../api/axios.js";
// Fallback logic
import { getLiveLocationData } from "../../data/locationData.js";

export default function AdminLocation() {
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. Fetch Location Data from Backend ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/content/location");
        if (res.data?.data?.values) {
          setLocationData(res.data.data.values);
        } else {
          setLocationData(getLiveLocationData());
        }
      } catch (err) {
        console.warn("Backend fetch failed, using local fallback.");
        setLocationData(getLiveLocationData());
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setLocationData((prev) => ({ ...prev, [field]: value }));
  };

  // --- 2. Save Data to Backend ---
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    
    const savePromise = api.put("/content/location", locationData);

    toast.promise(savePromise, {
      loading: 'Updating map and location coordinates...',
      success: <b>Location configuration saved successfully!</b>,
      error: <b>Failed to update location details.</b>,
    });
  };

  const handleReset = async () => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-darkbrown">Discard changes and restore live parameters?</p>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => toast.dismiss(t.id)} 
            className="text-xs text-gray-500 px-2 py-1 hover:text-darkbrown"
          >
            Cancel
          </button>
          <button 
            onClick={async () => {
              toast.dismiss(t.id);
              setIsLoading(true);
              try {
                const res = await api.get("/content/location");
                if (res.data?.data?.values) {
                  setLocationData(res.data.data.values);
                  toast.success("Restored database settings");
                }
              } catch (err) {
                toast.error("Failed to restore configuration");
              } finally {
                setIsLoading(false);
              }
            }} 
            className="bg-saffron text-white px-3 py-1 rounded-md text-xs font-bold hover:bg-saffron/90 transition"
          >
            Yes, Restore
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen text-saffron bg-[#fffaf3]">
      <Loader2 className="animate-spin mr-2" /> Loading location metadata...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffaf3] p-4 md:p-8 text-darkbrown font-sans">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-saffron/20 p-6 rounded-3xl shadow-sm gap-4 sticky top-4 z-40 backdrop-blur-md bg-white/90">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-darkbrown flex items-center gap-2">
              <MapPin className="text-saffron" /> लोकेशन प्रबंधन
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-brown/50 font-bold mt-1">Location & Map Admin</p>
          </div>
          <div className="flex gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border border-brown/10 hover:bg-gray-50 text-brown font-bold py-2.5 px-5 rounded-xl text-xs transition active:scale-95"
            >
              <RotateCcw size={14} /> रिसेट
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-saffron text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-lg shadow-saffron/20 hover:bg-saffron/90 transition active:scale-95"
            >
              <Save size={14} /> डेटा सेव करें
            </button>
          </div>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Headings & Text */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-saffron uppercase tracking-[2px] flex items-center gap-2 border-b border-gray-50 pb-3">
              <FileText size={16} /> 1. हेडर और मुख्य टेक्स्ट विवरण
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">टॉप टैग (Small Top Tag)</label>
                <input
                  type="text"
                  value={locationData.topTag}
                  onChange={(e) => handleChange("topTag", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">मुख्य हेडिंग (Main Heading)</label>
                <input
                  type="text"
                  value={locationData.mainHeading}
                  onChange={(e) => handleChange("mainHeading", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">लंबा विवरण (Main Description)</label>
              <textarea
                rows={3}
                value={locationData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Section 2: Google Map Integration */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-saffron uppercase tracking-[2px] flex items-center gap-2 border-b border-gray-50 pb-3">
              <Globe size={16} /> 2. गूगल मैप लिंक (Map Embed)
            </h3>

            <div>
              <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">गूगल मैप `src` यूआरएल</label>
              <input
                type="text"
                value={locationData.mapEmbedUrl}
                onChange={(e) => handleChange("mapEmbedUrl", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-saffron text-[11px] bg-gray-50/50 font-mono text-blue-600 truncate"
              />
              <div className="mt-3 bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start">
                <HelpCircle size={18} className="text-amber-600 shrink-0" />
                <div className="text-[11px] text-amber-900/70 leading-relaxed">
                  <strong className="text-amber-900 block mb-1">निर्देश (Instructions):</strong> 
                  Google Maps ➔ Share ➔ Embed a map ➔ Copy HTML. 
                  सिर्फ कोटेशन के अंदर का <code className="bg-amber-100 px-1 rounded text-amber-900">src="..."</code> वाला हिस्सा यहाँ पेस्ट करें।
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Floating Card Details */}
          <div className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-saffron uppercase tracking-[2px] flex items-center gap-2 border-b border-gray-50 pb-3">
              <MapPin size={16} /> 3. मैप के ऊपर का कार्ड (Floating Card)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">कार्ड टैग (Card Tag)</label>
                <input
                  type="text"
                  value={locationData.cardTag}
                  onChange={(e) => handleChange("cardTag", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">कार्ड हेडिंग</label>
                <input
                  type="text"
                  value={locationData.cardHeading}
                  onChange={(e) => handleChange("cardHeading", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">कार्ड विवरण</label>
              <textarea
                rows={3}
                value={locationData.cardDescription}
                onChange={(e) => handleChange("cardDescription", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-saffron text-sm bg-gray-50/50 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end pb-10">
            <button
              type="submit"
              className="group flex items-center gap-3 bg-darkbrown text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95"
            >
              <Save size={18} /> डेटाबेस में सेव करें
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}