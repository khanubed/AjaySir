import { motion } from "framer-motion";



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";

import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Send,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

import diya from "../assets/images/contact/diya.png"

import {
  contactDetails,
  contactFormFields,
  contactNumbers,
} from "../data/contact";

import { useState } from "react";

const iconMap = {
  Phone,
  Mail,
  MapPin,
  Clock3,
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setForm({
      name: "",
      mobile: "",
      address: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="bg-lightcream py-12 max-md:py-12 px-4 relative overflow-hidden"
    >
      <motion.img
        src={diya}
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
        className="w-80 max-sm:w-60  max-xs:w-30  absolute left-1/2 -translate-x-1/2 max-sm:top-30   top-35 z-50 opacity-20 object-contain"
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-saffron uppercase amaranth-regular tracking-[4px] font-medium">
            Contact Us
          </p>

          <h2 className="text-3xl md:text-5xl amita-bold text-darkbrown mt-4 leading-tight">
            आज ही अपनी पूजा और आध्यात्मिक सेवाएं बुक करें
          </h2>

          <p className="text-brown be-vietnam-pro-light text-md max-sm:text-sm md:text-lg leading-relaxed mt-6">
            अपनी पूजा, पावन हवन, धार्मिक अनुष्ठान, वास्तु शांति, नवग्रह शांति और व्यक्तिगत आध्यात्मिक मार्गदर्शन के लिए हमसे संपर्क करें। हम पूर्ण श्रद्धा, निष्ठा और पारंपरिक वैदिक विधि-विधान के साथ आपके अनुष्ठान संपन्न कराने के लिए सदैव उपलब्ध हैं।
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4 md:gap-10 mt-10 md:mt-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-4xl p-5 md:p-10"
          >
            <form className="md:space-y-4 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-darkbrown font-semibold mb-1 md:mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-brown/10 bg-white/70 md:px-5 md:py-3 px-2.5 py-1.5 outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/20 transition-all duration-300 text-darkbrown"
                />
              </div>
              <div>
                <label className="block text-darkbrown font-semibold mb-1 md:mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="w-full rounded-2xl border border-brown/10 bg-white/70 md:px-5 md:py-3 px-2.5 py-1.5 outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/20 transition-all duration-300 text-darkbrown"
                />
              </div>
              <div>
                <label className="block text-darkbrown font-semibold mb-1 md:mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full rounded-2xl border border-brown/10 bg-white/70 md:px-5 md:py-3 px-2.5 py-1.5 outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/20 transition-all duration-300 text-darkbrown"
                />
              </div>
              <div>
                <label className="block text-darkbrown font-semibold mb-1 md:mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message or puja requirement..."
                  rows={5}
                  className="w-full rounded-2xl border border-brown/10 bg-white/70 md:px-5 md:py-3 px-2.5 py-1.5 outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/20 transition-all duration-300 text-darkbrown resize-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-darkbrown hover:bg-[#3b1400] text-cream rounded-2xl px-6 py-3 flex   items-center justify-center gap-3 transition-all duration-500 hover:scale-[1.02] shadow-xl"
                >
                  <Send size={18} />
                  Send Request
                </button>

                <a
                  href={`tel:${contactNumbers.phone}`}
                  className="flex-1 border border-brown/20 bg-white/60 hover:bg-white text-darkbrown rounded-2xl    px-6 py-3 flex items-center justify-center gap-3 transition-all duration-500 hover:scale-[1.02]"
                >
                  <PhoneCall size={18} />
                  Call Now
                </a>
              </div>

              <p className="text-brown text-sm text-center leading-relaxed pt-4">
                “सभी अनुष्ठान और धार्मिक कर्म पूर्ण निष्ठा, प्रामाणिकता और उचित वैदिक परंपराओं के साथ संपन्न किए जाते हैं।”
              </p>
            </form>
          </motion.div>

          {/* CONTACT DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-[#240a00] to-[#4a1d00] rounded-4xl p-6 md:p-10 text-cream shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <p className="uppercase tracking-[4px] max-md:text-sm text-saffron amita-bold font-medium">
                हमसे संपर्क करें
              </p>

              <h3 className="text-3xl max-md:text-xl amita-bold font-bold mt-4 max-md:mt-2 leading-snug">
                आपकी आध्यात्मिक यात्रा में मार्गदर्शन के लिए हम सदैव तत्पर हैं
              </h3>

              <div className="space-y-5 max-md:space-y-2.5 mt-10 max-md:mt-5">
                {contactDetails.map((item) => {
                  const Icon = iconMap[item.icon];

                  return (
                    <div
                      key={item.id}
                      className="flex items-start  gap-4 max-md:gap-2.5 bg-white/5 border border-white/10 rounded-2xl p-5 max-md:p-2 hover:bg-white/10 transition-all duration-500"
                    >
                      <div className="w-12 h-12 rounded-xl bg-saffron/20 flex items-center justify-center shrink-0">
                        <Icon className="text-saffron" size={22} />
                      </div>

                      <div>
                        <h4 className="text-lg max-md:text-sm font-semibold">
                          {item.title}
                        </h4>

                        <p className="text-[#f3d9b1] max-md:text-xs mt-1">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <a
        href={`https://wa.me/${contactNumbers.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-green-500 hover:scale-110 transition-all duration-500 shadow-2xl flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faWhatsapp} className='text-white text-3xl' />
      </a>
    </section>
  );
}
