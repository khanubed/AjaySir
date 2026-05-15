import React from "react";
import { motion } from "framer-motion";

// Replace this path with your actual image path
import swastik from "../assets/images/services/swastik.svg";

import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Flame,
  Users,
  Orbit,
  Baby,
  BookOpen,
  FlameKindling,
  Home,
  Stars,
  HeartPulse,
  ArrowRight, // newly added for interaction
} from "lucide-react";

import { services } from "../data/services";

const iconMap = {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Flame,
  Users,
  Orbit,
  Baby,
  BookOpen,
  FlameKindling,
  Home,
  Stars,
  HeartPulse,
};

const Service = () => {
  return (
    <section
      id="services"
      className="bg-[#fffaf3] py-20 px-4 text-brown relative overflow-hidden"
    >
      <div className="text-center md:mt-9 mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl amaranth-bold text-darkbrown font-bold mb-4">
          Sacred Vedic Rituals & Spiritual Solutions
        </h2>

        <p className="text-brown max-md:text-sm be-vietnam-pro-regular max-w-3xl mx-auto">
          We offer authentic Vedic rituals and spiritual ceremonies performed
          with complete devotion, proper विधि-विधान, and traditional practices
          to bring peace, prosperity, positivity, and divine blessings into your
          life.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon];

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
              className="group flex flex-col rounded-[2rem] border border-saffron/20 bg-lightcream overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container with Hover Zoom Effect */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                <img
                  src={service.imageUrl}
                  alt={service.titleEnglish}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Floating Icon Over Image */}
                <div className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-saffron">
                  {Icon && <Icon size={22} className="text-brown group-hover:text-white transition-colors" />}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-7 flex-1 flex flex-col relative bg-lightcream">
                <h3 className="text-xl font-bold mb-1 amita-bold text-saffron">
                  {service.titleHindi}
                </h3>
                <h4 className="text-sm font-medium amaranth-regular mb-3 text-darkbrown uppercase tracking-wider opacity-80">
                  {service.titleEnglish}
                </h4>
                <p className="text-brown/70 be-vietnam-pro-regular leading-relaxed text-sm flex-1">
                  {service.description}
                </p>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Background Rotating Center Image */}
      <motion.img
        src={swastik}
        alt="Swastik Background"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 45,
          ease: "linear",
        }}
        className="w-80 max-sm:w-48 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0 opacity-[0.03] object-contain pointer-events-none"
      />
    </section>
  );
};

export default Service;