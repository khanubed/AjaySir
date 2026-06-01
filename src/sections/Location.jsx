import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { MapPin } from "lucide-react";
import { getLiveLocationData } from "../data/locationData";

export default function LocationSection() {
  const [liveLocationData, setLiveLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/content/location`;

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data?.data?.values) {
          setLiveLocationData(res.data.data.values);
        } else {
          // Fallback if data structure is missing
          setLiveLocationData(getLiveLocationData());
        }
      } catch (err) {
        console.warn("Using fallback location data due to API error.");
        setLiveLocationData(getLiveLocationData());
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  // Loading State (Skeleton UI)
  if (loading) {
    return (
      <section className="bg-lightcream pb-24 pt-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 animate-pulse mx-auto rounded-md mb-4" />
          <div className="h-12 w-3/4 bg-gray-200 animate-pulse mx-auto rounded-xl mb-16" />
          <div className="h-[500px] w-full bg-gray-200 animate-pulse rounded-[2.5rem]" />
        </div>
      </section>
    );
  }

  return (
    <section id='location' className="bg-lightcream pb-24 pt-10 px-4 overflow-hidden relative">

      {/* BACKGROUND BLUR GRADIENTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-saffron/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-brown/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER SECTION */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-saffron uppercase tracking-[4px] text-sm md:text-base font-bold"
          >
            {liveLocationData.topTag}
          </motion.p>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl amita-bold sm:text-4xl md:text-5xl font-bold text-darkbrown leading-tight mt-4"
          >
            {liveLocationData.mainHeading}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-brown leading-relaxed mt-6 max-w-3xl mx-auto"
          >
            {liveLocationData.description}
          </motion.p>
        </div>

        {/* INTERACTIVE GOOGLE MAP LAYER */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mt-16"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white shadow-2xl group">

            {/* IFRAME: Background pointer-events-none removed to allow map interaction */}
            <iframe
              src={liveLocationData.mapEmbedUrl}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-700"
              title="Service Location Map"
            ></iframe>

            {/* Dark Overlay vignette gradient at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#240a00ee] via-transparent to-transparent pointer-events-none opacity-80" />

            {/* FLOATING CARD INFO ON OVERLAY */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-4xl p-5 md:p-8 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center">
                   <MapPin size={16} className="text-saffron" />
                </div>
                <p className="text-saffron uppercase tracking-[3px] text-[10px] md:text-xs font-bold">
                  {liveLocationData.cardTag}
                </p>
              </div>

              <h3 className="text-xl md:text-3xl amita-bold text-cream leading-snug">
                {liveLocationData.cardHeading}
              </h3>

              <p className="text-[#f3d9b1] text-xs md:text-sm leading-relaxed mt-5 border-t border-white/10 pt-4">
                {liveLocationData.cardDescription}
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}