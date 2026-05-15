import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function LocationSection() {
  return (
    <section id='location' className="bg-lightcream pb-24 pt-10  px-4 overflow-hidden relative">

      <div className="absolute top-0 left-0 w-72 h-72 bg-saffron/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-brown/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center max-w-4xl mx-auto">

          <p className="text-saffron  uppercase tracking-[4px] text-sm md:text-base font-medium">
            Our Location 
          </p>

          <h2 className="text-3xl amaranth-bold sm:text-4xl md:text-5xl font-bold text-darkbrown leading-tight mt-4">
            Visit Our Spiritual Service Area
          </h2>

          <p className="text-base md:text-lg text-brown leading-relaxed mt-6">
            We are available for पूजा, हवन, धार्मिक अनुष्ठान,
            temple ceremonies, and home visits across the city
            and nearby areas with complete devotion and authentic
            Vedic traditions.
          </p>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mt-16"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 shadow-2xl">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7877.713126369053!2d75.88815190817779!3d22.74588894057598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd315b9b97b3%3A0x802fe3df65171895!2sAlphawizz%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1777531170179!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-[2.5rem]"
            ></iframe>

            <div className="absolute inset-0 bg-linear-to-t from-[#240a00cc] via-transparent to-transparent pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:max-w-md backdrop-blur-xl  bg-white/15 border border-white/20 rounded-4xl p-4 md:p-7 shadow-2xl"
            >

              <p className="text-saffron uppercase tracking-[3px] text-xs md:text-sm">
                Serving with Faith & Devotion
              </p>

              <h3 className="text-xl md:text-3xl font-bold text-cream leading-snug mt-4">
                Authentic Spiritual Guidance
              </h3>

              <p className="text-[#f3d9b1] text-xs md:text-sm leading-relaxed mt-5">
                Authentic Vedic rituals and spiritual guidance
                for peace, positivity, and divine blessings.
              </p>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}