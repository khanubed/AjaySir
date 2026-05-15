import React from "react";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight, HelpCircle, Sparkles, CheckCircle2 } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import circularPattern from "../assets/images/Home/circularPattern.png";
import { bannerContent } from "../data/bannerContent";

const Home = () => {
  const images = [
    "https://thumbs.dreamstime.com/b/indian-hindu-traditional-pooja-vedic-fire-ceremony-called-yagya-indian-wedding-vivah-yagya-items-indian-yajna-ritual-172095938.jpg",
    "https://i.pinimg.com/736x/59/e1/e1/59e1e1eab14adac61199255fa878f818.jpg",
    "https://www.poojn.in/wp-content/uploads/2025/02/Durga-Puja-A-Guide-to-Rituals-Significance-and-Celebrations.jpeg.jpg",
    "https://kesariweekly.com/wp-content/uploads/2021/02/ritual.jpg",
  ];

  return (
    <section id="home" className="bg-darkbrown overflow-hidden w-full min-h-screen relative flex flex-col justify-between">
      <NavBar />

      {/* BACKGROUND SWIPER LAYER */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="w-full h-full homeSwiper"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full bg-darkbrown relative">
                <div
                  className="w-full opacity-15 h-screen bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                />
                {/* Vignette styling wrapper to shadow image slide edges */}
                <div className="absolute inset-0 bg-gradient-to-b from-darkbrown/80 via-transparent to-darkbrown" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CORE WRAPPER CONTENT GRID */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center text-white px-4 pt-24 pb-12">
        <div className="max-w-6xl w-full flex items-center justify-center flex-col gap-5">

          {/* LEFT SIDE: ORIGINAL PRIMARY CONTENT HERO */}
          <div className=" text-center flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-cream/10 border border-lightcream/30 px-4 py-1.5 rounded-full mb-6 mx-auto lg:mx-0 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                <span className="text-[11px] text-lightcream font-semibold tracking-[2px] uppercase">
                  Vedic & Spiritual Services
                </span>
              </div>

              <h1 className="amita-bold text-5xl md:text-6xl mb-2 text-orange-200 drop-shadow-md">
                विश्वसनीय पंडित जी
              </h1>
              <h1 className="amita-regular text-4xl md:text-5xl text-cream drop-shadow-md">
                सभी वैदिक अनुष्ठानों के लिए
              </h1>

              <p className="be-vietnam-pro-regular px-8 mt-6 text-sm md:text-base text-cream/80 leading-relaxed mx-auto lg:mx-0">
                Experience divine guidance and authentic Vedic rituals performed
                with devotion, tradition, and spiritual knowledge.
              </p>


            </motion.div>
          </div>

          {/* RIGHT SIDE: INTEGRATED PROBLEMS & GUIDANCE HERO BANNER CARD */}
          <div className="  text-center ">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-fit -gradient-to-b text-center from-darkbrown/90 to-[#1e0800]/95 border border-saffron/30 rounded-[0.5rem] p-2 md:p-2 shadow-2xl backdrop-blur-md relative overflow-hidden"
            >


              <div className="relative z-10 m-4 flex flex-col items-center">
                {/* Header Problem Badge Row */}
                {/* <div className="flex items-center text-center gap-2 text-saffron mb-4 bg-saffron/10 border border-saffron/20 w-fit px-3 py-1 rounded-full">
                  <HelpCircle size={14} className="animate-bounce" />
                  <span className="text-[11px] uppercase tracking-wider font-bold amaranth-regular">
                    {bannerContent.subtitle} 
                  </span>
                </div> */}
                <div className='flex flex-col  gap-5 w-full md:flex-row justify-center items-center '>
                  <div className=' '>
                    <h3 className="text-2xl md:text-3xl amita-bold text-cream mb-0">
                      {bannerContent.subtitle} {/* "Find Peace & Solutions" */}
                    </h3>
                    <h4 className="text-lg md:text-xl font-semibold text-saffron tracking-wide mb-0 amaranth-regular">
                      {bannerContent.titleMain}
                      {bannerContent.titleHighlight} {/* "Through Vedic Wisdom" */}
                    </h4>
                  </div>
                  <div className=" flex gap-4  justify-center lg:justify-start max-sm:flex-col max-sm:items-center">
                    <a href="#services" className="px-6 py-3 text-center min-w-[150px] bg-saffron text-darkbrown font-bold rounded-full h-fit hover:bg-orange-500 hover:scale-105 transition-all duration-300 shadow-lg text-sm">
                      Book a Service
                    </a>
                    <a href="tel:+911234567890" className="px-6 h-fit py-3 text-center min-w-[150px] border-cream/70 border-2 rounded-full hover:bg-cream/10 font-medium transition-all duration-300 text-sm">
                      Call Now
                    </a>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* BACKGROUND ROTATING CIRCULAR MANDALA PATTERN */}
      <motion.img
        src={circularPattern}
        alt="Circular Pattern"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 55,
          ease: "linear",
        }}
        className="w-[80vh] h-[80vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 opacity-25 object-contain pointer-events-none select-none"
      />
    </section>
  );
};

export default Home;