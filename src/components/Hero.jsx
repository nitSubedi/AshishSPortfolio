import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ExternalLink } from 'lucide-react';
import { projects } from '../data';

const Hero = ({ heroGridCategory }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const reelVideoPath = "/reel.mp4";

  // Filter projects for the hero grid category
  const heroGridProjects = heroGridCategory
    ? projects.filter((p) => p.group === heroGridCategory)
    : [];

  // If we have a hero grid category, render the video grid
  if (heroGridCategory && heroGridProjects.length > 0) {
    return (
      <section className="min-h-screen w-full bg-gray-900 px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Category Header */}
          <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">
              {heroGridCategory}
            </h2>
            <span className="text-xs text-gray-500 tracking-widest uppercase">
              {heroGridProjects.length} Videos
            </span>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroGridProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-black overflow-hidden relative rounded-sm">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                      <ExternalLink className="text-white" size={24} />
                    </div>
                  </div>
                  {/* Year Badge */}
                  <span className="absolute top-3 left-3 text-[9px] font-bold text-emerald-400 border border-emerald-400/30 px-2 py-1 uppercase tracking-widest bg-black/60 backdrop-blur-sm rounded">
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors line-clamp-2">
                  {project.title}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default Hero
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