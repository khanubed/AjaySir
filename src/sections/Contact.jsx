import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Send,
  PhoneCall,
} from "lucide-react";

import diya from "../assets/images/contact/diya.png";

// Fallback logic
import { getContactConfig, getContactDetailsArray } from "../data/contact";

const iconMap = { Phone, Mail, MapPin, Clock3 };

export default function Contact() {
  // Contact details state
  const [contactConfig, setContactConfig] = useState(getContactConfig());

  // Form state
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const CONTACT_API_URL = "http://localhost:5000/api/content/contact";
  const QUERY_API_URL = "http://localhost:5000/api/query";

  // Fetch Contact Details
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(CONTACT_API_URL);

        if (res.data?.data?.values) {
          setContactConfig(res.data.data.values);
        }
      } catch (err) {
        console.warn("Using fallback contact data due to API error.");
      }
    };

    fetchContact();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        address: form.address.trim(),
        message: form.message.trim(),
      };

      const res = await axios.post(QUERY_API_URL, payload);

      if (res.data.success) {
        alert("आपका अनुरोध प्राप्त हो गया है। हम जल्द ही आपसे संपर्क करेंगे।");

        setForm({
          name: "",
          mobile: "",
          address: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Query Submit Error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to submit request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!contactConfig) return null;

  const dynamicContactDetails = getContactDetailsArray(contactConfig);

  return (
    <section
      id="contact"
      className="bg-lightcream py-12 px-4 relative overflow-hidden"
    >
      {/* Decorative Diya Animation */}
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
        className="w-80 max-sm:w-60 absolute left-1/2 -translate-x-1/2 top-35 z-50 opacity-20 object-contain pointer-events-none"
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
            अपनी पूजा, पावन हवन, धार्मिक अनुष्ठान, वास्तु शांति, नवग्रह शांति
            और व्यक्तिगत आध्यात्मिक मार्गदर्शन के लिए हमसे संपर्क करें।
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4 md:gap-10 mt-10 md:mt-20">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-4xl p-5 md:p-10"
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-darkbrown font-semibold mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-brown/10 bg-white/70 px-4 py-2.5 outline-none focus:border-saffron text-darkbrown text-sm"
                />
              </div>

              <div>
                <label className="block text-darkbrown font-semibold mb-1">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  required
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="w-full rounded-2xl border border-brown/10 bg-white/70 px-4 py-2.5 outline-none focus:border-saffron text-darkbrown text-sm"
                />
              </div>

              <div>
                <label className="block text-darkbrown font-semibold mb-1">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full rounded-2xl border border-brown/10 bg-white/70 px-4 py-2.5 outline-none focus:border-saffron text-darkbrown text-sm"
                />
              </div>

              <div>
                <label className="block text-darkbrown font-semibold mb-1">
                  Message
                </label>

                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message or puja requirement..."
                  rows={4}
                  className="w-full rounded-2xl border border-brown/10 bg-white/70 px-4 py-2.5 outline-none focus:border-saffron text-darkbrown text-sm resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-darkbrown hover:bg-[#3b1400] disabled:opacity-60 disabled:cursor-not-allowed text-cream rounded-2xl py-3 flex items-center justify-center gap-3 transition-all duration-300 font-semibold text-sm shadow-md active:scale-95"
                >
                  <Send size={16} />
                  {loading ? "Submitting..." : "Send Request"}
                </button>

                <a
                  href={`tel:${contactConfig.phone.replace(/\s+/g, "")}`}
                  className="flex-1 border border-brown/20 bg-white/60 hover:bg-white text-darkbrown rounded-2xl py-3 flex items-center justify-center gap-3 transition-all duration-300 font-semibold text-sm shadow-sm active:scale-95"
                >
                  <PhoneCall size={16} />
                  Call Now
                </a>
              </div>
            </form>
          </motion.div>

          {/* Contact Details Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#240a00] to-[#4a1d00] rounded-4xl p-6 md:p-10 text-cream shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <p className="uppercase tracking-[4px] text-xs text-saffron font-bold">
                हमसे संपर्क करें
              </p>

              <h3 className="text-xl md:text-2xl font-bold mt-3 leading-snug">
                आपकी आध्यात्मिक यात्रा में मार्गदर्शन के लिए हम सदैव तत्पर हैं
              </h3>

              <div className="space-y-4 mt-8">
                {dynamicContactDetails.map((item) => {
                  const Icon = iconMap[item.icon];

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-saffron/20 flex items-center justify-center shrink-0">
                        <Icon className="text-saffron" size={20} />
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-white/90">
                          {item.title}
                        </h4>

                        <p className="text-[#f3d9b1] text-xs mt-0.5">
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

      {/* WhatsApp Button */}
      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`https://wa.me/${contactConfig.whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 shadow-2xl flex items-center justify-center text-white"
      >
        <FontAwesomeIcon
          icon={faWhatsapp}
          className="text-3xl"
        />
      </motion.a>
    </section>
  );
} 