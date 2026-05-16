import React from "react";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import circularPattern from "../assets/images/Home/circularPattern.png";
// नई बनाई गई होम डेटा फ़ाइल को इम्पोर्ट करें
import { bannerContent } from "../data/homeData";

const Home = () => {
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
          {bannerContent.sliderImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full bg-darkbrown relative">
                <div
                  className="w-full opacity-15 h-screen bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                />
                {/* Vignette overlay shading edges for deep background contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-darkbrown/80 via-transparent to-darkbrown" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CORE WRAPPER CONTENT GRID */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center text-white px-4 pt-18 md:pt-24 pb-12">
        <div className="max-w-6xl w-full flex items-center justify-center flex-col gap-5">

          {/* FIRST BLOCK: PRIMARY BRAND SLOGAN */}
          <div className="text-center flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* English Accent Tag */}
              <div className="inline-flex items-center gap-2 bg-cream/10 border border-lightcream/30 px-4 py-1.5 rounded-full mb-4 md:mb-6 mx-auto backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                <span className="md:text-[11px] text-[8px] text-lightcream font-semibold tracking-[2px] uppercase">
                  {bannerContent.topTag}
                </span>
              </div>

              {/* Hindi Headings */}
              <h1 className="amita-bold text-5xl md:text-6xl mb-2 text-orange-200 drop-shadow-md">
                {bannerContent.mainHeading}
              </h1>
              <h1 className="amita-regular text-3xl md:text-5xl text-cream drop-shadow-md">
                {bannerContent.subHeading}
              </h1>

              {/* Hindi Description */}
              <p className="be-vietnam-pro-regular px-3 md:px-8 mt-3 md:mt-6 text-sm md:text-base text-cream/80 leading-relaxed max-w-3xl mx-auto">
                {bannerContent.description}
              </p>
            </motion.div>
          </div>

          {/* SECOND BLOCK: PROBLEM INTEGRATION BANNER CARD */}
          <div className="text-center w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full bg-gradient-to-b from-darkbrown/90 to-[#1e0800]/95 border border-saffron/30 rounded-[0.5rem] p-2 md:p-2 shadow-2xl backdrop-blur-md relative overflow-hidden"
            >
              <div className="relative z-10 m-4 flex flex-col items-center">
                <div className="flex flex-col gap-3 md:gap-5 w-full md:flex-row justify-center items-center">
                  
                  {/* Problem & Solution Texts in Hindi */}
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl md:text-3xl amita-bold text-cream mb-0">
                      {bannerContent.problemBanner.question}
                    </h3>
                    <h4 className="text-lg md:text-xl font-semibold text-saffron tracking-wide mb-0 amaranth-regular">
                      {bannerContent.problemBanner.solution}
                    </h4>
                  </div>

                  {/* Responsive Action Buttons (Kept English as requested) */}
                  <div className="flex md:gap-4 gap-2 justify-center lg:justify-start max-sm:flex-col max-sm:items-center">
                    <a 
                      href={bannerContent.ctas.primary.link} 
                      className="md:px-6 md:py-3 px-4 py-2 text-center min-w-[150px] bg-saffron text-darkbrown font-bold rounded-full h-fit hover:bg-orange-500 hover:scale-105 transition-all duration-300 shadow-lg text-sm"
                    >
                      {bannerContent.ctas.primary.label}
                    </a>
                    <a 
                      href={bannerContent.ctas.secondary.link} 
                      className="md:px-6 md:py-3 px-4 py-2 h-fit text-center min-w-[150px] border-cream/70 border-2 rounded-full hover:bg-cream/10 font-medium transition-all duration-300 text-sm"
                    >
                      {bannerContent.ctas.secondary.label}
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