import React from "react";
import { motion } from "framer-motion";
import { locationData } from "../data/locationData";

export default function LocationSection() {
  return (
    <section id='location' className="bg-lightcream pb-24 pt-10 px-4 overflow-hidden relative">

      {/* BACKGROUND BLUR GRADIENTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-saffron/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-brown/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER SECTION */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-saffron uppercase tracking-[4px] text-sm md:text-base font-medium">
            {locationData.topTag}
          </p>

          <h2 className="text-3xl amita-bold sm:text-4xl md:text-5xl font-bold text-darkbrown leading-tight mt-4">
            {locationData.mainHeading}
          </h2>

          <p className="text-base md:text-lg text-brown leading-relaxed mt-6 max-w-3xl mx-auto">
            {locationData.description}
          </p>
        </div>

        {/* INTERACTIVE GOOGLE MAP LAYER */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mt-16"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 shadow-2xl">

            <iframe
              src={locationData.mapEmbedUrl}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-[2.5rem]"
              title="Service Location Map"
            ></iframe>

            {/* Dark Overlay vignette gradient at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#240a00cc] via-transparent to-transparent pointer-events-none" />

            {/* FLOATING CARD INFO ON OVERLAY */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:max-w-md backdrop-blur-xl bg-white/15 border border-white/20 rounded-4xl p-4 md:p-7 shadow-2xl"
            >
              <p className="text-saffron uppercase tracking-[3px] text-xs md:text-sm font-semibold">
                {locationData.cardTag}
              </p>

              <h3 className="text-xl md:text-3xl amita-bold text-cream leading-snug mt-4">
                {locationData.cardHeading}
              </h3>

              <p className="text-[#f3d9b1] text-xs md:text-sm leading-relaxed mt-5">
                {locationData.cardDescription}
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}