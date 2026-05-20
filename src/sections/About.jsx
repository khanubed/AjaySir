import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
// डेटा लोड करने के लिए नए हेल्पर फंक्शन को इम्पोर्ट करें
import { getAboutData } from "../data/about.js";

export default function About() {
  // लाइव डेटा को स्टेट में मैनेज करें ताकि एडमिन पैनल के चेंजेस तुरंत सिंक हो सकें
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    setAboutData(getAboutData());
  }, []);

  // जब तक डेटा लोड न हो, एक क्लीन स्केलेटन या खाली स्पेस दिखाएं
  if (!aboutData) {
    return <div className="bg-lightcream py-24 min-h-[60vh]" />;
  }

  return (
    <section id="about" className="bg-lightcream py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 justify-center items-center">
          
          {/* LEFT SIDE: IMAGE WITH EXPERIENCE COUNTER */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-2/3 max-w-xl max-md:order-2 w-full"
          >
            <div className="overflow-hidden rounded-4xl shadow-2xl border border-brown/10 aspect-2/3 h-auto flex-wrap bg-brown/5">
              <img
                src={aboutData.image || "https://www.shutterstock.com/image-photo/hindu-indian-pandit-looking-front-260nw-2626343377.jpg"}
                alt="Pandit Ji"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            <div className="absolute bottom-6 -right-4 bg-cream backdrop-blur-md shadow-xl rounded-3xl max-md:p-3 p-6 border border-brown/10">
              <h3 className="text-3xl font-bold max-md:text-xl text-darkbrown">
                {aboutData.stats.count}
              </h3>
              <p className="text-brown mt-1 max-md:text-xs font-semibold">
                {aboutData.stats.label}
              </p>
            </div>
          </motion.div>

          {/* RIGHT SIDE: TEXT CONTENT BLOCK */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-md:order-1"
          >
            <p className="text-saffron max-md:text-center amaranth-bold uppercase tracking-[4px] font-medium">
              {aboutData.topTag}
            </p>
            <h2 className="text-3xl md:text-5xl max-md:text-center amita-bold leading-tight text-darkbrown mt-4">
              {aboutData.mainHeading}
            </h2>
            
            {/* Dynamic paragraphs map */}
            <div className="space-y-6 mt-8 be-vietnam-pro-light text-brown text-sm md:text-lg leading-relaxed text-justify">
              {aboutData.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Dynamic highlights checklist grid */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {aboutData.highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-lightcream rounded-2xl p-2 md:p-4 border border-brown/10 shadow-sm"
                >
                  <CheckCircle2 size={22} className="text-saffron mt-1 shrink-0" />
                  <p className="text-darkbrown amaranth-regular max-md:text-sm font-medium">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM: DYNAMIC MISSION CARD BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-darkbrown to-[#4a1d00] rounded-4xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />

          <div className="relative z-10">
            <p className="uppercase max-md:text-md tracking-[4px] amaranth-regular text-saffron">
              {aboutData.mission.tag}
            </p>

            <h2 className="text-2xl amita-bold md:text-4xl text-cream mt-4">
              {aboutData.mission.heading}
            </h2>

            <p className="text-[#f3d9b1] be-vietnam-pro-regular text-sm md:text-base leading-relaxed max-w-4xl mx-auto mt-8">
              {aboutData.mission.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}