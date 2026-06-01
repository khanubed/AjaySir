import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { galleryImages as fallbackImages } from "../data/gallery";
import eyes from "../assets/images/gallery/eye.png";

export default function Gallery() {
  // Initial state uses fallback data for instant rendering
  const [images, setImages] = useState(fallbackImages);
  const [sectionTitle, setSectionTitle] = useState("दिव्य क्षण एवं पवित्र अनुष्ठान");
  const [sectionSubtitle, setSectionSubtitle] = useState(
    "पूर्ण भक्ति, सनातन परंपरा और प्रामाणिक वैदिक पद्धतियों के साथ संपन्न कराए गए पवित्र अनुष्ठानों, आध्यात्मिक समारोहों, हवन, विशेष पूजा और अलौकिक क्षणों की दिव्य झलकियाँ देखें।"
  );

  const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/content/gallery`;

  useEffect(() => {
    const fetchGalleryContent = async () => {
      try {
        const res = await axios.get(API_URL);
        const data = res.data?.data?.values;
        
        if (data) {
          // Agar database mein images hain, toh hi update karein
          if (data.images && data.images.length > 0) {
            setImages(data.images);
          }
          if (data.sectionTitle) setSectionTitle(data.sectionTitle);
          if (data.sectionSubtitle) setSectionSubtitle(data.sectionSubtitle);
        }
      } catch (err) {
        console.error("Backend fetch failed, staying with local data:", err);
      }
    };

    fetchGalleryContent();
  }, []);

  return (
    <section id='gallery' className="bg-lightcream text-center py-20 px-4 relative overflow-hidden">
      {/* Background Decorative Eyes */}
      <motion.img
        src={eyes}
        animate={{
          x: [0, -8, 6, -4, 5, 0],
          y: [0, 5, -6, 4, -3, 0],
          rotate: [0, -1, 1, -1, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-80 max-sm:w-60 max-xs:w-30 absolute left-1/2 -translate-x-1/2 max-sm:top-30 top-15 z-10 opacity-30 object-contain pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-0">
        <div className="mb-14 flex flex-col items-center w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl mb-5 amaranth-bold md:text-5xl font-bold text-darkbrown mt-3"
          >
            {sectionTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-brown text-center max-w-4xl be-vietnam-pro"
          >
            {sectionSubtitle}
          </motion.p>
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
          {images.map((img, index) => (
            <motion.div
              key={img.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % 10) * 0.05 }}
              viewport={{ once: true }}
              className="break-inside-avoid mb-5 overflow-hidden rounded-3xl group relative cursor-pointer"
            >
              <img
                src={img.image}
                alt={`Gallery image ${index}`}
                loading="lazy"
                className="w-full object-cover aspect-4/3 transition duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-darkbrown/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
                 <p className="text-white/80 text-xs font-medium tracking-widest uppercase">Spiritual Moments</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}