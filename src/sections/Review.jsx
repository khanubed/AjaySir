import { motion } from "framer-motion";
import { Award, Users, Sparkles, Star, Quote } from "lucide-react";
import { overviewStats, reviews } from "../data/reviews";

const iconMap = {
  Award,
  Users,
  Sparkles,
  Star,
};

export default function Review() {
  return (
    <section id='reviews' className="bg-lightcream py-16 md:py-24 px-4 overflow-hidden relative">
      <motion.div
        animate={{
          x: [0, -8, 6, -4, 5, 0],
          y: [0, 5, -6, 4, -3, 0],
          rotate: [0, -2, 2, -1, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-50 h-50 max-sm:w-30 text-9xl ama max-xs:w-30 absolute left-1/2 -translate-x-1/2 max-sm:top-60 amita-bold top-30 z-5 opacity-10 object-contain"
      >
        ॐ
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-saffron uppercase tracking-[4px]  text-sm md:text-base font-medium">
            Devotees Trust Our Spiritual Services
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl  amaranth-bold font-bold text-darkbrown leading-tight mt-4">
            Bringing Peace, Positivity & Divine Blessings to Every Family
          </h2>

          <p className="text-sm sm:text-md md:text-lg text-brown  leading-relaxed mt-6">
            Hundreds of families have trusted our Vedic rituals, पूजा services,
            and spiritual guidance for peace, prosperity, happiness, and
            positive energy. Every ceremony is performed with devotion,
            authenticity, and proper विधि-विधान.
          </p>
        </div>

        {/* OVERVIEW STATS */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {overviewStats.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-5 md:p-7 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-saffron/15 flex items-center justify-center">
                    <Icon className="text-saffron" size={22} />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-darkbrown mt-6">
                    {item.number}
                  </h3>

                  <h4 className="text-lg md:text-xl font-semibold text-darkbrown mt-3">
                    {item.title}
                  </h4>

                  <p className="text-brown text-sm md:text-base leading-relaxed mt-3">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>


        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-saffron uppercase tracking-[4px]  text-sm md:text-base font-medium">
              What Devotees Say About Us
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl  amaranth-bold font-bold text-darkbrown leading-tight mt-4">
              Trusted by Families & Devotees
            </h2>

            <p className="text-sm sm:text-md md:text-lg text-brown  leading-relaxed mt-6">
              Real experiences shared by families and devotees who received
              spiritual guidance and Vedic services with complete satisfaction
              and positivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {reviews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/50 backdrop-blur-xl border border-white/30 rounded-4xl p-5 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-saffron/15 flex items-center justify-center">
                    <Quote className="text-saffron" size={22} />
                  </div>

                  <div className="flex gap-1 mt-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-saffron text-saffron"
                      />
                    ))}
                  </div>

                  <p className="text-brown text-sm md:text-md leading-relaxed mt-4">
                    {item.review}
                  </p>

                  <div className="mt-6">
                    <h4 className="text-darkbrown font-semibold text-md md:text-lg">
                      {item.name}
                    </h4>

                    <p className="text-brown text-xs md:text-sm mt-1">Verified Devotee</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* QUOTE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-18 bg-linear-to-r from-[#240a00] to-[#4a1d00] rounded-4xl p-6 md:p-10 text-center relative overflow-hidden"
        >

          <div className="relative z-10">
            <Quote className="text-saffron mx-auto" size={30} />
            <p className="text-xl md:text-3xl amaranth-bold leading-relaxed font-semibold text-cream mt-4 max-w-4xl mx-auto">
              “Faith and devotion together create peace, positivity, and divine
              blessings in life.” 
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
