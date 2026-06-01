import React, { useState, useEffect } from "react"; // Added useState & useEffect
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
} from "lucide-react";

// Local fallback data
import { services as fallbackServices } from "../data/services";

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
  // State to hold services data
  const [servicesData, setServicesData] = useState(fallbackServices);

  // API Call implementation
  useEffect(() => {
    const fetchLiveServices = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/content/services`);
        const json = await response.json();
        
        // Agar response sahi hai aur array khali nahi hai
        if (json.success && json.data && json.data.values && json.data.values.length > 0) {
          setServicesData(json.data.values);
        } else {
          console.warn("Backend services empty or invalid, using local data.js");
        }
      } catch (error) {
        console.error("CMS Server error. Falling back to local services data.", error);
        // Catch block trigger hone par automatically fallbackServices use honge (kyunki state default wahi hai)
      }
    };

    fetchLiveServices();
  }, []);

  return (
    <section
      id="services"
      className="bg-[#fffaf3] py-20 px-4 text-brown relative overflow-hidden"
    >
      <div className="text-center md:mt-9 mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl amita-bold text-darkbrown font-bold mb-4">
          पवित्र वैदिक अनुष्ठान एवं आध्यात्मिक समाधान
        </h2>

        <p className="text-brown max-md:text-sm be-vietnam-pro-regular max-w-3xl mx-auto">
          हम आपके जीवन में सुख, समृद्धि, सकारात्मकता और ईश्वरीय आशीर्वाद लाने के लिए पूर्ण भक्ति, उचित विधि-विधान और पारंपरिक प्रथाओं के साथ संपन्न होने वाले प्रामाणिक वैदिक अनुष्ठान और आध्यात्मिक सेवाएं प्रदान करते हैं।
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {/* map using the state variable servicesData */}
        {servicesData.map((service, index) => {
          const Icon = iconMap[service.icon] || Sparkles; // Fallback icon if not found

          return (
            <motion.div
              key={service.id || index}
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
        className="w-60 max-sm:w-48 absolute left-1/2 -translate-x-1/2 top-10 z-0 opacity-[0.1] object-contain pointer-events-none"
      />
    </section>
  );
};

export default Service;