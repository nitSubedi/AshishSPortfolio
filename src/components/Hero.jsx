import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const reelVideoPath = "/reel.mp4"; // Make sure this file is in your 'public' folder

  return (
    <section className="h-[80vh] md:h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-gray-900">
      
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          // --- VIEW 1: TITLE & PLAY BUTTON ---
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col justify-center items-center z-10"
          >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-40 z-0">
               <img src="/projects/landscape/DSC08877.JPG" className="w-full h-full object-cover" alt="Background" />
            </div>

            {/* Text Content */}
            <div className="z-10 text-center space-y-6 px-4">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
              >
                VISUAL STORYTELLING
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <button 
                  //onClick={() => setIsPlaying(true)}
                  className="group flex items-center gap-3 mx-auto border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={12} fill="currentColor" />
                  </div>
                  <span className="text-xs md:text-sm tracking-widest uppercase font-medium">Play Reel</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // --- VIEW 2: FULL SCREEN VIDEO PLAYER ---
          <motion.div 
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-black"
          >
            {/* Close Button (Top Right) */}
            <button 
              onClick={() => setIsPlaying(false)}
              className="absolute top-8 right-8 z-30 text-white/50 hover:text-white transition-colors bg-black/20 backdrop-blur-sm p-2 rounded-full"
            >
              <X size={24} />
            </button>

            <video 
              src={reelVideoPath} 
              className="w-full h-full object-cover" 
              controls 
              autoPlay 
              playsInline
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;