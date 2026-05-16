import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { videoData } from "../data/videoData";
import {faYoutube} from '@fortawesome/free-brands-svg-icons'

export const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section id= "videos" className="bg-lightcream py-20 px-4 md:px-10">
      <div className="max-w-7xl  mx-auto ">

        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl mb-5 amaranth-bold md:text-5xl font-bold text-darkbrown mt-3"
          >
            {videoData.sectionTitle}
          </motion.h1>
          <h2 className="text-brown text-center  be-vietnam-pro">
            {videoData.sectionSubtitle}
          </h2>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoData.videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative h-64 overflow-hidden rounded-[2rem] cursor-pointer shadow-lg border border-saffron/10"
                onClick={() => setSelectedVideo(video.videoUrl)}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-saffron rounded-full flex items-center justify-center text-darkbrown shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-6 px-2">
                <h3 className="text-xl amita-bold text-saffron mb-2">{video.title}</h3>
                <p className="text-brown/70 text-sm leading-relaxed">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal (Popup) */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-sm"
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 text-white hover:text-saffron transition-colors"
            >
              <X size={40} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src={selectedVideo}
                title="Video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoSection;