import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Loader2 } from "lucide-react";
import axios from "axios";

// Fallback data import
import { videoData as fallbackData } from "../data/videoData";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/content/videos`;

export const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // --- States for Dynamic Content ---
  const [content, setContent] = useState({
    sectionTitle: fallbackData.sectionTitle,
    sectionSubtitle: fallbackData.sectionSubtitle,
    videos: fallbackData.videos,
  });
  const [loading, setLoading] = useState(true);

  // --- Fetch Data from Backend ---
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(API_URL);
        // Backend logic: res.data.data.values mein hamara data hai
        const remoteValues = res.data?.data?.values;

        if (remoteValues) {
          setContent({
            sectionTitle: remoteValues.sectionTitle || fallbackData.sectionTitle,
            sectionSubtitle: remoteValues.sectionSubtitle || fallbackData.sectionSubtitle,
            videos: remoteValues.videos?.length > 0 ? remoteValues.videos : fallbackData.videos,
          });
        }
      } catch (err) {
        console.warn("Backend link failed, showing offline content.");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <section id="videos" className="bg-lightcream py-20 px-4 md:px-10 min-h-[400px]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl mb-5 amaranth-bold md:text-5xl font-bold text-darkbrown mt-3"
          >
            {content.sectionTitle}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-brown text-center be-vietnam-pro max-w-2xl mx-auto"
          >
            {content.sectionSubtitle}
          </motion.h2>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.videos.map((video, index) => (
            <motion.div
              key={video.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative h-64 overflow-hidden rounded-[2rem] cursor-pointer shadow-lg border border-saffron/10 bg-darkbrown/5"
                onClick={() => setSelectedVideo(video.videoUrl)}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
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
                <p className="text-brown/70 text-sm leading-relaxed line-clamp-3">
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
            onClick={() => setSelectedVideo(null)} // Click outside to close
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-md"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-saffron transition-colors z-[110]"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={40} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video
            >
              <iframe
                src={selectedVideo.includes('autoplay') ? selectedVideo : `${selectedVideo}?autoplay=1`}
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