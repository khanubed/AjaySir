import React from "react";
import { ArrowRight, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { bannerContent } from "../data/bannerContent";

const CentreBanner = () => {
  return (
    <div className="w-full px-6 md:px-10 py-10 bg-lightcream text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Subtle Question Tag */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 px-4 py-1.5 rounded-full mb-4"
        >
          <HelpCircle size={15} className="text-saffron" />
          <span className="text-saffron text-xs font-bold uppercase tracking-widest">
            {bannerContent.subtitle}
          </span>
        </motion.div>

        {/* Main Clean Typography */}
        <h2 className="text-3xl md:text-5xl amita-bold text-darkbrown leading-tight">
          {bannerContent.titleMain} <span className="text-saffron">{bannerContent.titleHighlight}</span>
        </h2>

        <p className="text-brown/80 mt-4 text-sm md:text-base max-w-2xl be-vietnam-pro-regular leading-relaxed">
          {bannerContent.description}
        </p>

        {/* Simple Link Button */}
        <a
          href={bannerContent.ctas.secondary.link}
          className="group mt-6 text-saffron font-bold flex items-center gap-2 hover:text-darkbrown transition-colors duration-300 text-sm md:text-base"
        >
          {bannerContent.ctas.secondary.label}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default CentreBanner;