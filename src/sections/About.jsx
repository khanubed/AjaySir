import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {  highlights } from "../data/about";

export default function About() {
  return (
    <section id="about" className="bg-lightcream py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2  gap-14 justify-center items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-2/3 max-w-xl max-md:order-2"
          >
            <div className="overflow-hidden rounded-4xl shadow-2xl border border-brown/10 aspect-2/3 h-auto flex-wrap">
              <img
                src="https://www.shutterstock.com/image-photo/hindu-indian-pandit-looking-front-260nw-2626343377.jpg"
                alt="Pandit Ji"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-6 -right-4 bg-cream backdrop-blur-md shadow-xl rounded-3xl max-md:p-3 p-6 border border-brown/10">
              <h3 className="text-3xl font-bold max-md:text-xl text-darkbrown">
                1000+
              </h3>
              <p className="text-brown mt-1 max-md:text-xs">
                Sacred Rituals Completed
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-md:order-1"
          >
            <p className="text-saffron max-md:text-center amaranth-bold uppercase tracking-[4px] font-medium">
              About Pandit Ji
            </p>
            <h2 className="text-3xl md:text-5xl max-md:text-center amaranth-bold leading-tight font-bold text-darkbrown mt-4">
              Dedicated to Sacred Vedic Traditions & Spiritual Guidance
            </h2>
            <div className="space-y-6 mt-8 be-vietnam-pro-light text-brown text-sm md:text-lg leading-relaxed">
              <p>
                With years of experience in Vedic rituals and spiritual
                ceremonies, Pandit Ji is devoted to serving families with
                authentic पूजा, हवन, and धार्मिक अनुष्ठान performed according to
                traditional Hindu scriptures and विधि-विधान.
              </p>

              <p>
                Every ritual is conducted with purity, devotion, and deep
                spiritual knowledge to bring peace, positivity, prosperity, and
                divine blessings into your life.
              </p>

              <p>
                From Grah Shanti and Rudrabhishek to Vastu Puja and Durga
                Saptashati Path, each ceremony is performed with complete
                dedication and respect for sacred traditions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-lightcream rounded-2xl p-2 md:p-4 border border-brown/10 shadow-sm"
                >
                  <CheckCircle2
                    size={22}
                    className="text-saffron mt-1 shrink-0"
                  />

                  <p className="text-darkbrown amaranth-regular max-md:text-sm font-medium">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 bg-linear-to-r from-darkbrown to-[#4a1d00] rounded-4xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />

          <div className="relative z-10">
            <p className="uppercase max-md:text-md tracking-[4px] amaranth-regular text-saffron">
              Our Mission
            </p>

            <h2 className="text-2xl amaranth-bold md:text-4xl font-bold text-cream mt-4">
              Preserving Sacred Traditions
            </h2>

            <p className="text-[#f3d9b1] be-vietnam-pro-regular text-sm leading-relaxed max-w-4xl mx-auto mt-8">
              Our mission is to preserve and share the beauty of Vedic
              traditions while helping people find peace, spiritual strength,
              positivity, and harmony through sacred rituals and divine
              guidance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
