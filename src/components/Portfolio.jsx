import React from 'react';
import { projects } from '../data';
import ProjectCard from './ProjectCard';
import Lightbox from './Lightbox';
import VideoModal from './VideoModal';
import { AnimatePresence, motion } from 'framer-motion';

const Portfolio = ({ featuredProject, visibleGroup, selectedProject, onOpenProject, onCloseProject }) => {
  
  const filteredProjects = visibleGroup 
    ? projects.filter(p => p.group === visibleGroup)
    : [];

  return (
    <section className="relative z-20">
      
      {/* MODE 1: SINGLE FEATURED PROJECT (For Films) */}
      {featuredProject && (
        <div className="min-h-screen flex items-center px-6 py-20 max-w-7xl mx-auto">
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             className="w-full"
           >
             <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
               <h2 className="text-sm text-gray-500 tracking-widest uppercase">
                 Featured Project
               </h2>
               <button 
                 onClick={() => onOpenProject(featuredProject)}
                 className="text-xs text-emerald-400 hover:text-white transition-colors uppercase tracking-widest"
               >
                 Play Now
               </button>
             </div>

             {/* Render Card in 'Featured' Layout */}
             <ProjectCard 
               project={featuredProject} 
               layout="featured" // <--- Triggers Side-by-Side view
               onClick={onOpenProject} 
             />
           </motion.div>
        </div>
      )}

      {/* MODE 2: GRID VIEW (For Photos/Sports) */}
      {visibleGroup && filteredProjects.length > 0 && (
        <div className="px-6 py-20 max-w-7xl mx-auto min-h-screen bg-cinema-black">
          <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
            <h2 className="text-sm text-gray-500 tracking-widest uppercase">
              {visibleGroup} Collection
            </h2>
            <span className="text-xs text-gray-600">Selected Works</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                layout="grid" // <--- Triggers Stacked view
                onClick={onOpenProject} 
              />
            ))}
          </div>
        </div>
      )}

      {/* OVERLAYS */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {(selectedProject.galleryImages && selectedProject.galleryImages.length > 0) ? (
              <Lightbox 
                images={selectedProject.galleryImages} 
                initialIndex={0} 
                onClose={onCloseProject} 
              />
            ) : selectedProject.type === 'video' ? (
              <VideoModal 
                videoSrc={selectedProject.videoSrc}
                onClose={onCloseProject}
              />
            ) : null}
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;