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
          <p className="text-saffron uppercase tracking-[4px] text-sm md:text-base font-medium">
            हमारी आध्यात्मिक सेवाओं पर भक्तों का अटूट विश्वास
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl amita-bold font-bold text-darkbrown leading-tight mt-4">
            हर परिवार में सुख, शांति, सकारात्मकता और ईश्वरीय आशीर्वाद का संचार
          </h2>

          <p className="text-sm sm:text-md md:text-lg text-brown leading-relaxed mt-6">
            सैकड़ों परिवारों ने जीवन में सुख, समृद्धि, खुशहाली और सकारात्मक ऊर्जा के लिए हमारे वैदिक अनुष्ठानों, पावन पूजा सेवाओं और आध्यात्मिक मार्गदर्शन पर भरोसा किया है। प्रत्येक मांगलिक कर्म पूर्ण भक्ति, प्रामाणिकता और उचित विधि-विधान के साथ संपन्न किया जाता है।
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
            <p className="text-saffron uppercase tracking-[4px] text-sm md:text-base font-medium">
              हमारे बारे में भक्तों के विचार
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl amita-bold font-bold text-darkbrown leading-tight mt-4">
              परिवारों और श्रद्धालुओं का अटूट विश्वास
            </h2>

            <p className="text-sm sm:text-md md:text-lg text-brown leading-relaxed mt-6">
              उन परिवारों और भक्तों के वास्तविक अनुभव, जिन्होंने पूर्ण संतुष्टि, असीम श्रद्धा और सकारात्मकता के साथ आध्यात्मिक मार्गदर्शन और वैदिक सेवाओं का लाभ प्राप्त किया।
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
            <p className="text-xl md:text-3xl amita-bold leading-relaxed font-semibold text-cream mt-4 max-w-4xl mx-auto">
              “श्रद्धा और भक्ति मिलकर जीवन में शांति, सकारात्मकता और दिव्य आशीर्वाद का सृजन करते हैं।”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
