import React from "react";
import { PhoneCall, HelpCircle } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { bannerContent } from "../data/homeData";

const ActionStrip = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#240a00] via-[#3b1400] to-[#240a00] border-y border-white/10 py-3.5 px-4 md:px-12 flex flex-col md:flex-row items-center justify-center gap-4 shadow-xl relative z-30">
      


      {/* Actionable Clean Responsive Grid Link System */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {/* Direct Phone Link */}
        <a 
          href={bannerContent.ctas.primary.link} 
          className="flex items-center gap-2 text-cream hover:text-saffron transition-colors text-sm font-medium group"
        >
          <PhoneCall size={15} className="text-saffron group-hover:scale-110 transition-transform" />
          <span>Call Now</span>
        </a>

        {/* Decorative Divider */}
        <span className="w-px h-4 bg-white/20 hidden md:block" />

        {/* WhatsApp Link */}
        <a 
          href={bannerContent.socials.whatsapp} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 text-cream hover:text-[#25D366] transition-colors text-sm font-medium group"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="text-base text-[#25D366] group-hover:scale-110 transition-transform" />
          <span>WhatsApp</span>
        </a>

        {/* Decorative Divider */}
        <span className="w-px h-4 bg-white/20 hidden md:block" />

        {/* Instagram Link */}
        <a 
          href={bannerContent.socials.instagram} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 text-cream hover:text-[#E1306C] transition-colors text-sm font-medium group"
        >
          <FontAwesomeIcon icon={faInstagram} className="text-base text-[#E1306C] group-hover:scale-110 transition-transform" />
          <span>Instagram</span>
        </a>
      </div>
    </div>
  );
};

export default ActionStrip;