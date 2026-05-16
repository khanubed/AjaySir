import { motion } from "framer-motion";
import { galleryImages } from "../data/gallery";
import eyes from "../assets/images/gallery/eye.png"

const images = galleryImages;

export default function Gallery() {
  return (
    <section id='gallery' className="bg-lightcream text-center py-20 px-4 relative">
      <motion.img
        src={eyes}
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
        className="w-80 max-sm:w-60  max-xs:w-30  absolute left-1/2 -translate-x-1/2 max-sm:top-30   top-15 z-50 opacity-30 object-contain"
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 flex flex-col items-center w-full">
          <h2 className="text-3xl mb-5 amaranth-bold md:text-5xl font-bold text-darkbrown mt-3">
            दिव्य क्षण एवं पवित्र अनुष्ठान
          </h2>
          <p className="text-brown text-center max-w-4xl be-vietnam-pro">
            पूर्ण भक्ति, सनातन परंपरा और प्रामाणिक वैदिक पद्धतियों के साथ संपन्न कराए गए पवित्र अनुष्ठानों, आध्यात्मिक समारोहों, हवन, विशेष पूजा और अलौकिक क्षणों की दिव्य झलकियाँ देखें।
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="break-inside-avoid mb-5  overflow-hidden rounded-3xl group relative"
            >
              <img
                src={img.image}
                alt=""
                loading="lazy"
                className="w-full object-cover aspect-4/3 transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-from-darkbrown/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
