import React, { useState, useEffect } from "react";
import { Sparkles, HelpCircle, Link2, Image, Share2, Save, Loader2, Upload } from "lucide-react";
import { bannerContent as initialBannerContent } from "../../data/homeData";
import api from "../../api/axios";

export default function AdminHero({ onSave }) {
  const [heroData, setHeroData] = useState(initialBannerContent);
  const [isLoading, setIsLoading] = useState(true);
  
  // हर इमेज स्लाइड के लिए अलग-अलग अपलोडिंग स्टेट ट्रैक करने के लिए
  const [uploadingIndex, setUploadingIndex] = useState(null);

  // 1. FETCH LIVE CONTENT FROM DATABASE ON COMPONENT MOUNT
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/content/hero");
        const json = await response.json();
        
        if (json.success && json.data && json.data.values) {
          setHeroData(json.data.values);
        }
      } catch (error) {
        console.error("Error retrieving live database content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const handleChange = (key, value) => {
    setHeroData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNestedChange = (parentKey, childKey, value) => {
    setHeroData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value,
      },
    }));
  };

  const handleCtaChange = (ctaType, field, value) => {
    setHeroData((prev) => ({
      ...prev,
      ctas: {
        ...prev.ctas,
        [ctaType]: {
          ...prev.ctas[ctaType],
          [field]: value,
        },
      },
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...heroData.sliderImages];
    updatedImages[index] = value;
    setHeroData((prev) => ({ ...prev, sliderImages: updatedImages }));
  };

  // क्लाउड इमेज अपलोडर फंक्शन (Cloudinary Integration)
  const handleCloudinaryUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploadingIndex(index); // इस इंडेक्स के लिए स्पिनर चालू करें
      
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData, // फ़ाइल डेटा हमेशा FormData में जाता है
      });

      const data = await response.json();

      if (data.success) {
        handleImageChange(index, data.imageUrl); // स्टेट में लाइव यूआरएल सेट करें
      } else {
        alert("अपलोड विफल रहा: " + data.message);
      }
    } catch (error) {
      console.error("Upload transmission error:", error);
      alert("सर्वर से कनेक्ट नहीं हो सका।");
    } finally {
      setUploadingIndex(null); // स्पिनर बंद करें
    }
  };

  // 2. TRANSMIT DATA PERSISTENTLY VIA REST ENDPOINT
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/content/hero` , heroData)
      // console.log(result);

      const result = await response.data;

      if (result.success) {
        onSave("मुख्य बैनर और एक्शन स्ट्रिप (Action Strip) डेटा सफलतापूर्वक सर्वर पर अपडेट हो गया है!");
      } else {
        onSave("डेटा सुरक्षित करने में त्रुटि आई: " + result.message);
      }
    } catch (error) {
      console.error("Transmission error:", error);
      onSave("सर्वर से कनेक्शन नहीं हो सका। कृपया पुनः प्रयास करें।");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-saffron gap-3">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-sm tracking-wide text-brown">डेटाबेस से सामग्री लोड हो रही है...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className="max-w-4xl space-y-8 pb-12 selection:bg-saffron selection:text-darkbrown">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 flex-wrap">
        <div>
          <h3 className="text-2xl font-bold text-darkbrown amita-bold flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-saffron" /> मुख्य बैनर और एक्शन स्ट्रिप संपादन
          </h3>
          <p className="text-brown text-sm mt-0.5">
            होमपेज बैनर टेक्स्ट, क्विक सोशल लिंक्स, कॉल नंबर और बैकग्राउंड इमेजेज को यहीं से नियंत्रित करें।
          </p>
        </div>
        <button
          type="submit"
          className="bg-linear-to-r from-saffron to-amber-600 text-[#240a00] px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-saffron/10 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <Save className="w-4 h-4" /> बदलाव सुरक्षित करें
        </button>
      </div>

      {/* BLOCK 1: CORE TEXT CONTENT */}
      <div className="bg-[#240a00] border border-white/5 p-6 rounded-2xl space-y-5">
        <h4 className="text-base font-semibold text-saffron tracking-wide border-b border-white/5 pb-2">
          1. मुख्य टेक्स्ट और हेडिंग्स
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="text-xs text-[#f3d9b1]/70 block mb-1.5 font-medium">इंग्लिश एक्सेंट टैग (Top Tag)</label>
            <input
              type="text"
              value={heroData.topTag || ""}
              onChange={(e) => handleChange("topTag", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-cream text-sm focus:outline-none focus:border-saffron/40"
            />
          </div>
          <div>
            <label className="text-xs text-[#f3d9b1]/70 block mb-1.5 font-medium">मुख्य हेडिंग (Main Hindi Heading)</label>
            <input
              type="text"
              value={heroData.mainHeading || ""}
              onChange={(e) => handleChange("mainHeading", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-cream text-sm focus:outline-none focus:border-saffron/40 font-semibold"
            />
          </div>
          <div>
            <label className="text-xs text-[#f3d9b1]/70 block mb-1.5 font-medium">उप हेडिंग (Sub Hindi Heading)</label>
            <input
              type="text"
              value={heroData.subHeading || ""}
              onChange={(e) => handleChange("subHeading", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-cream text-sm focus:outline-none focus:border-saffron/40"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-[#f3d9b1]/70 block mb-1.5 font-medium">विस्तृत विवरण (Hindi Description)</label>
            <textarea
              rows="3"
              value={heroData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-cream text-sm focus:outline-none focus:border-saffron/40 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* BLOCK 2: INNER PROBLEM BANNER COMPONENT */}
      <div className="bg-[#240a00] border border-white/5 p-6 rounded-2xl space-y-5">
        <h4 className="text-base font-semibold text-saffron tracking-wide border-b border-white/5 pb-2 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" /> 2. समस्या निवारण कार्ड पट्टी (Problem Banner)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs text-[#f3d9b1]/70 block mb-1.5 font-medium">प्रश्न / समस्या सूचक वाक्य</label>
            <input
              type="text"
              value={heroData.problemBanner?.question || ""}
              onChange={(e) => handleNestedChange("problemBanner", "question", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-cream text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-[#f3d9b1]/70 block mb-1.5 font-medium">समाधान / आश्वासन वाक्य</label>
            <input
              type="text"
              value={heroData.problemBanner?.solution || ""}
              onChange={(e) => handleNestedChange("problemBanner", "solution", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-cream text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* BLOCK 3: ACTION STRIP & SOCIAL LINKS CONNECTORS */}
      <div className="bg-[#240a00] border border-white/5 p-6 rounded-2xl space-y-5">
        <h4 className="text-base font-semibold text-saffron tracking-wide border-b border-white/5 pb-2 flex items-center gap-2">
          <Share2 className="w-5 h-5" /> 3. सोशल मीडिया और एक्शन स्ट्रिप लिंक्स (Socials Context)
        </h4>
        <p className="text-xs text-[#f3d9b1]/40 -mt-2">
          यह सेक्शन सीधे होमपेज की हॉरिजॉन्टल एक्शन पट्टी (Action Strip) के सोशल मीडिया हैंडल्स को बदलता.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs text-[#f3d9b1]/70 block mb-1.5 font-medium">व्हाट्सएप चैट यूआरएल (WhatsApp API Link)</label>
            <input
              type="text"
              value={heroData.socials?.whatsapp || ""}
              onChange={(e) => handleNestedChange("socials", "whatsapp", e.target.value)}
              placeholder="https://wa.me/91..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-cream text-sm focus:outline-none focus:border-emerald-500/40 font-mono text-emerald-300"
            />
          </div>

          <div>
            <label className="text-xs text-[#f3d9b1]/70 block mb-1.5 font-medium">इंस्टाग्राम प्रोफाइल लिंक (Instagram URL)</label>
            <input
              type="text"
              value={heroData.socials?.instagram || ""}
              onChange={(e) => handleNestedChange("socials", "instagram", e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-cream text-sm focus:outline-none focus:border-pink-500/40 font-mono text-pink-300"
            />
          </div>
        </div>
      </div>

      {/* BLOCK 4: CALL TO ACTION BUTTON LABELS */}
      <div className="bg-[#240a00] border border-white/5 p-6 rounded-2xl space-y-5">
        <h4 className="text-base font-semibold text-saffron tracking-wide border-b border-white/5 pb-2 flex items-center gap-2">
          <Link2 className="w-5 h-5" /> 4. मुख्य बटन कॉन्फ़िगरेशन (Call To Actions)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white/2 rounded-xl border border-white/5 space-y-4">
            <span className="text-xs font-bold text-orange-200 block uppercase tracking-wider">प्राथमिक बटन (Primary Button)</span>
            <div>
              <label className="text-xs text-[#f3d9b1]/50 block mb-1">बटन का नाम (Label)</label>
              <input type="text" value={heroData.ctas?.primary?.label || ""} onChange={(e) => handleCtaChange("primary", "label", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-cream text-xs focus:outline-none" />
            </div>
            <div>
              <label className="text-xs text-[#f3d9b1]/50 block mb-1">टारगेट एंकर लिंक</label>
              <input type="text" value={heroData.ctas?.primary?.link || ""} onChange={(e) => handleCtaChange("primary", "link", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-cream text-xs focus:outline-none" />
            </div>
          </div>

          <div className="p-4 bg-white/2 rounded-xl border border-white/5 space-y-4">
            <span className="text-xs font-bold text-orange-200 block uppercase tracking-wider">कॉल बटन (Secondary / Action Strip Phone)</span>
            <div>
              <label className="text-xs text-[#f3d9b1]/50 block mb-1">बटन टेक्स्ट / फ़ोन नंबर प्रदर्शन</label>
              <input type="text" value={heroData.ctas?.secondary?.label || ""} onChange={(e) => handleCtaChange("secondary", "label", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-cream text-xs focus:outline-none" />
            </div>
            <div>
              <label className="text-xs text-[#f3d9b1]/50 block mb-1">टेलीफोन प्रोटोकॉल यूआरएल</label>
              <input type="text" value={heroData.ctas?.secondary?.link || ""} onChange={(e) => handleCtaChange("secondary", "link", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-cream text-xs focus:outline-none font-mono" />
            </div>
          </div>
        </div>
      </div>

      {/* BLOCK 5: CLOUDINARY UPLOADER FOR SLIDER IMAGES */}
      <div className="bg-[#240a00] border border-white/5 p-6 rounded-2xl space-y-5">
        <h4 className="text-base font-semibold text-saffron tracking-wide border-b border-white/5 pb-2 flex items-center gap-2">
          <Image className="w-5 h-5" /> 5. बैकग्राउंड स्लाइडर इमेजेज (Swiper Images)
        </h4>

        <div className="space-y-4">
          {(heroData.sliderImages || []).map((imgUrl, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white/2 p-4 rounded-xl border border-white/5">
              
              {/* लाइव प्रिव्यू थंबनेल */}
              <div 
                className="w-16 h-16 bg-cover bg-center rounded-lg border border-white/10 shrink-0 bg-[#130500] relative flex items-center justify-center overflow-hidden" 
                style={{ backgroundImage: uploadingIndex !== idx ? `url(${imgUrl})` : 'none' }}
              >
                {uploadingIndex === idx && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-saffron animate-spin" />
                  </div>
                )}
              </div>

              {/* अपलोडर कंट्रोल्स */}
              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-orange-200 block font-mono">SLIDE_IMAGE_ASSET #{idx + 1}</label>
                  
                  {/* कस्टम फ़ाइल अपलोडर बटन */}
                  <label className="text-[11px] text-saffron flex items-center gap-1 cursor-pointer bg-white/5 hover:bg-white/10 px-2 py-1 rounded border border-saffron/20 transition-all">
                    <Upload className="w-3 h-3" /> फ़ाइल चुनें
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingIndex !== null}
                      onChange={(e) => handleCloudinaryUpload(e, idx)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* रीड-ओनली यूआरएल डिस्प्ले */}
                <input
                  type="text"
                  value={imgUrl}
                  readOnly
                  placeholder="कोई इमेज अपलोड नहीं है"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-cream text-xs focus:outline-none opacity-60 font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </form>
  );
}