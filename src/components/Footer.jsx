import React, { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";

import {
  faInstagram,
  faFacebook,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import {
  faMessage
} from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";
import { footerLinks, footerServices, getLiveFooterData } from "../data/footer";

const iconMap = {
  faInstagram,
  faFacebook,
  faMessage,
  faYoutube
};

export default function Footer() {
  const [liveData, setLiveData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/content/footer";

  useEffect(() => {
    const fetchLiveFooter = async () => {
      try {
        // डायरेक्ट बैकएंड API से फ्रेश डेटा ला रहे हैं
        const res = await axios.get(API_URL);
        if (res.data?.data?.values) {
          setLiveData(res.data.data.values);
        } else {
          setLiveData(getLiveFooterData());
        }
      } catch (err) {
        console.warn("Backend fetch failed for footer, falling back to local storage/data.");
        // नेटवर्क फेलियर के केस में सेफ फॉलबैक
        setLiveData(getLiveFooterData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveFooter();
  }, []);

  // जब तक डेटा सिंक हो रहा हो, एक प्रोफेशनल मिनिमल लोडर दिखेगा (लेआउट जर्क रोकने के लिए)
  if (isLoading || !liveData) {
    return (
      <footer className="bg-[#1b0700] py-16 text-center text-[#f3d9b1] text-sm flex flex-col items-center justify-center gap-3 border-t border-saffron/10">
        <Loader2 className="animate-spin text-saffron" size={24} />
        <p className="tracking-widest text-[11px] uppercase font-bold opacity-60">वैदिक डेटा सिंक हो रहा है...</p>
      </footer>
    );
  }

  return (
    <footer className="relative pt-10 overflow-hidden bg-linear-to-b from-[#240a00] via-[#1b0700] to-black text-cream border-t border-saffron/10">

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-6 pb-16">

          {/* COLUMN 1: BRAND LOGO & CORE SLOGAN */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-saffron/15 border border-saffron/20 flex items-center justify-center text-2xl">
                <motion.span
                  animate={{
                    rotate: [0, 5, -5, 3, -3, 0],
                    y: [0, -2, 2, -1, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block text-3xl text-orange-200"
                >
                  ॐ
                </motion.span>
              </div>

              <div>
                <h2 className="text-2xl font-bold amaranth-bold">Pandit Ji</h2>
                <p className="text-[#f3d9b1] text-sm tracking-wide">Vedic Services</p>
              </div>
            </div>

            {/* लाइव डायनेमिक स्लोगन (Admin Panel Driven) */}
            <p className="text-[#f3d9b1] leading-relaxed mt-6 text-sm md:text-base font-medium opacity-90">
              {liveData.slogan}
            </p>

            {/* Floating Quote Box - लाइव डायनेमिक कोट */}
            {liveData.quote && (
              <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 shadow-inner backdrop-blur-xs">
                <p className="text-sm text-[#f3d9b1]/90 leading-relaxed italic">
                  "{liveData.quote}"
                </p>
              </div>
            )}
          </div>

          {/* COLUMN 2: QUICK NAVIGATION LINKS (Static Routing) */}
          <div>
            <h3 className="text-xl font-semibold text-cream amita-regular border-b border-white/5 pb-2 w-fit pr-6">
              त्वरित लिंक्स
            </h3>

            <div className="flex flex-col gap-4 mt-6">
              {footerLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  className="text-[#f3d9b1] hover:text-saffron transition-all duration-300 relative w-fit text-sm md:text-base after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-saffron hover:after:w-full after:transition-all after:duration-500"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 3: SPIRITUAL SERVICES LIST (Static Domain Array) */}
          <div>
            <h3 className="text-xl font-semibold text-cream amita-regular border-b border-white/5 pb-2 w-fit pr-6">
              आध्यात्मिक सेवाएं
            </h3>

            <div className="flex flex-col gap-4 mt-6">
              {footerServices.map((item, index) => (
                <div
                  key={index}
                  className="text-[#f3d9b1] flex items-start gap-3 text-sm md:text-base group"
                >
                  <span className="text-saffron transition-transform group-hover:scale-125 duration-300">✦</span>
                  <p className="group-hover:text-cream transition-colors duration-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 4: SOCIAL CONNECT LAYER */}
          <div>
            <h3 className="text-xl font-semibold text-cream border-b border-white/5 pb-2 w-fit pr-6">
              Connect With Us
            </h3>

            <p className="text-[#f3d9b1] leading-relaxed mt-6 text-sm opacity-80">
              आध्यात्मिक मार्गदर्शन, विशिष्ट अनुष्ठानों और व्यक्तिगत वैदिक पूजा सेवाओं के लिए किसी भी समय संपर्क करें।
            </p>

            {/* Dynamic Social Icons Render from Backend Live Data State */}
            <div className="flex flex-wrap gap-3 mt-8">
              {liveData.socialLinks?.map((item, index) => {
                const icon = iconMap[item.icon];
                if (!item.link) return null; // अगर लिंक खाली है तो आइकन रेंडर नहीं होगा
                
                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.name}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-saffron/40 hover:bg-saffron/10 transition-all duration-500 hover:-translate-y-1 flex items-center justify-center group"
                  >
                    {icon && (
                      <FontAwesomeIcon 
                        icon={icon} 
                        className="text-xl text-amber-500 group-hover:text-saffron transition-colors duration-300" 
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: COPYRIGHT DISCLOSURE - लाइव डायनेमिक कॉपीराइट */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#f3d9b1]/70 text-xs md:text-sm text-center md:text-left w-full tracking-wide">
            {liveData.footerBottomText}
          </p>
        </div>

      </div>
    </footer>
  );
}