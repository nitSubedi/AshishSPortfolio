import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Play } from 'lucide-react';

const ProjectCard = ({ project, index = 0, onClick, layout = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  // Determine if this is the active "Hero" video
  const isFeaturedVideo = layout === 'featured' && project.type === 'video';

  useEffect(() => {
    // Only run hover logic if it's NOT the featured video
    if (!isFeaturedVideo && project.type === 'video' && videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, project.type, isFeaturedVideo]);

  const getButtonText = () => {
    if (project.galleryImages && project.galleryImages.length > 0) return 'View Gallery';
    if (project.type === 'link') return 'Visit Site';
    if (project.type === 'video') return 'Watch Film';
    return 'View Project';
  };

  // --- LAYOUT STYLES ---
  const containerClass = layout === 'featured' 
    ? "group cursor-default grid md:grid-cols-2 gap-8 items-center" // Removed cursor-pointer for featured
    : "group cursor-pointer flex flex-col gap-6";

  const titleClass = layout === 'featured'
    ? "text-3xl md:text-5xl font-medium text-gray-100 transition-colors"
    : "text-2xl font-medium text-gray-100 group-hover:text-white transition-colors";

  // Handle Card Click (Disabled for Featured Video player to prevent modal conflict)
  const handleCardClick = (e) => {
    if (isFeaturedVideo) return; // Don't trigger click for the featured player
    onClick(project);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={containerClass}
      onMouseEnter={() => !isFeaturedVideo && setIsHovered(true)} // Disable hover for featured
      onMouseLeave={() => !isFeaturedVideo && setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Visual Side */}
      <div className={`aspect-video w-full bg-gray-900 overflow-hidden relative rounded-sm shadow-2xl shadow-black/50 ${layout === 'featured' ? 'md:order-1' : ''}`}>
        
        {project.type === 'video' ? (
          isFeaturedVideo ? (
            // --- MODE A: FEATURED HERO PLAYER (Autoplay, Controls, No Hover) ---
            <video
              src={project.videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              onClick={(e) => e.stopPropagation()} // Allow clicking controls without bubbling
            />
          ) : (
            // --- MODE B: GRID PREVIEW PLAYER (Hover to Play) ---
            <>
              <img 
                src={project.image} 
                alt={project.title} 
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
              />
              <video
                ref={videoRef}
                src={project.videoSrc}
                muted
                loop
                playsInline
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Play Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20">
                  <Play fill="white" className="text-white" size={32} />
                </div>
              </div>
            </>
          )
        ) : (
          // --- MODE C: STATIC IMAGE (For Photos/Links) ---
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        )}
        
        {/* Border Overlay (Only for non-featured items) */}
        {!isFeaturedVideo && (
           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 border border-white/5 pointer-events-none" />
        )}
      </div>
      
      {/* Text Side */}
      <div className={`space-y-4 relative ${layout === 'featured' ? 'md:order-2' : ''}`}>
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-emerald-400 border border-emerald-400/30 px-2 py-1 uppercase tracking-widest bg-emerald-900/10">
              {project.category}
            </span>
            <span className="text-[10px] text-gray-500 tracking-widest">{project.year}</span>
        </div>
        
        <h3 className={titleClass}>
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
          {project.description}
        </p>

        {/* Buttons (Hidden for Featured Video since the player IS the action) */}
        {!isFeaturedVideo && (
          <div className="pt-4 flex gap-4">
            <button className="flex items-center gap-2 text-xs uppercase tracking-widest text-white border-b border-transparent hover:border-emerald-400 transition-all pb-1">
              {getButtonText()} 
              {project.type === 'link' ? <ExternalLink size={14} /> : <ArrowRight size={14} />}
            </button>
            
            {project.pdf && (
              <a 
                href={project.pdf} 
                onClick={(e) => e.stopPropagation()} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white/50"
              >
                Read Statement
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;