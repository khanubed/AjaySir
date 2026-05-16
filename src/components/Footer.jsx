import React from "react";
import { ArrowRight } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faInstagram,
  faFacebook,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import {
  faMessage
} from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";
import { footerBottomText, footerLinks, footerServices, socialLinks } from "../data/footer";

const iconMap = {
  faInstagram,
  faFacebook,
  faMessage,
  faYoutube
};

export default function Footer() {
  return (
    <footer className="relative pt-10 overflow-hidden bg-linear-to-b from-[#240a00] via-[#1b0700] to-black text-cream">

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
                <p className="text-[#f3d9b1] text-sm">Vedic Services</p>
              </div>
            </div>

            <p className="text-[#f3d9b1] leading-relaxed mt-6 text-sm md:text-base">
              वैदिक परंपराओं के माध्यम से आपके जीवन में सुख, शांति, सकारात्मकता और दिव्य आशीर्वाद का संचार।
            </p>

            {/* Floating Quote Box */}
            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-sm text-[#f3d9b1] leading-relaxed italic">
                “विश्वास, सच्ची भक्ति और पवित्र अनुष्ठान जीवन को सकारात्मक ऊर्जा और दैवीय कृपा से आलोकित करते हैं।”
              </p>
            </div>
          </div>

          {/* COLUMN 2: QUICK NAVIGATION LINKS */}
          <div>
            <h3 className="text-xl font-semibold text-cream amita-regular">त्वरित लिंक्स</h3>

            <div className="flex flex-col gap-4 mt-6">
              {footerLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  className="text-[#f3d9b1] hover:text-saffron transition-all duration-300 relative w-fit after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-saffron hover:after:w-full after:transition-all after:duration-500"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 3: SPIRITUAL SERVICES LIST */}
          <div>
            <h3 className="text-xl font-semibold text-cream amita-regular">
              आध्यात्मिक सेवाएं
            </h3>

            <div className="flex flex-col gap-4 mt-6">
              {footerServices.map((item, index) => (
                <div
                  key={index}
                  className="text-[#f3d9b1] flex items-start gap-3"
                >
                  <span className="text-saffron mt-1">✦</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 4: SOCIAL CONNECT LAYER */}
          <div>
            <h3 className="text-xl font-semibold text-cream">

              Connect With Us

            </h3>

            <p className="text-[#f3d9b1] leading-relaxed mt-6 text-sm md:text-base">
              आध्यात्मिक मार्गदर्शन, विशिष्ट अनुष्ठानों और व्यक्तिगत वैदिक पूजा सेवाओं के लिए किसी भी समय संपर्क करें।
            </p>

            {/* Dynamic Social Icons Render */}
            <div className="flex flex-wrap gap-4 mt-8">
              {socialLinks.map((item, index) => {
                const icon = iconMap[item.icon];
                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:border-saffron/40 hover:bg-saffron/10 transition-all duration-500 hover:-translate-y-1 flex items-center justify-center"
                  >
                    {icon && <FontAwesomeIcon icon={icon} style={{ color: "rgb(245, 158, 11)" }} className="text-2xl" />}
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: COPYRIGHT DISCLOSURE */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#f3d9b1] text-sm text-center md:text-left w-full">
            {footerBottomText}
          </p>
        </div>

      </div>
    </footer>
  );
}