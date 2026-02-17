import React from 'react';
import { projects } from '../data';
import Lightbox from './Lightbox';
import VideoModal from './VideoModal';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Portfolio = ({ currentProject, currentCategory, selectedProject, onOpenProject, onCloseProject }) => {

  // Get projects for category view
  const categoryProjects = currentCategory
    ? projects.filter(p => p.group === currentCategory)
    : [];

  // If showing a single project (film)
  if (currentProject) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen p-6 md:p-12 lg:p-16"
      >
        {/* Video Embed */}
        <div className="w-full max-w-5xl">
          {currentProject.type === 'video' ? (
            <div className="aspect-video bg-cinema-black rounded overflow-hidden shadow-lg">
              <video
                src={currentProject.videoSrc}
                controls
                className="w-full h-full object-cover"
                poster={currentProject.image}
              />
            </div>
          ) : currentProject.type === 'link' ? (
            <a
              href={currentProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-video bg-cinema-black rounded overflow-hidden shadow-lg relative group"
            >
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <ExternalLink className="text-white" size={32} />
                </div>
              </div>
            </a>
          ) : currentProject.galleryImages ? (
            <div
              onClick={() => onOpenProject(currentProject)}
              className="aspect-video bg-cinema-black rounded overflow-hidden shadow-lg cursor-pointer relative group"
            >
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm tracking-widest uppercase">View Gallery</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Project Info */}
        <div className="mt-8 max-w-3xl">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-cinema-black">
              {currentProject.title}
            </h2>
          </div>

          {currentProject.description && (
            <p className="text-cinema-black/70 leading-relaxed max-w-2xl">
              {currentProject.description}
            </p>
          )}

          <div className="mt-6 flex items-center gap-4 text-sm text-cinema-black/50">
            <span>{currentProject.category}</span>
            <span>•</span>
            <span>{currentProject.year}</span>
          </div>

          {currentProject.pdf && (
            <a
              href={currentProject.pdf}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm text-cinema-black/60 hover:text-cinema-black transition-colors underline"
            >
              Read Artist Statement
            </a>
          )}
        </div>

        {/* Lightbox/VideoModal Overlays */}
        <AnimatePresence>
          {selectedProject && selectedProject.galleryImages && (
            <Lightbox
              images={selectedProject.galleryImages}
              initialIndex={0}
              onClose={onCloseProject}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Category view (travel, commercial, photos)
  if (currentCategory && categoryProjects.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen p-6 md:p-12 lg:p-16"
      >
        {/* Header */}
        <div className="mb-12">
          <h1 className="heading-serif text-4xl md:text-5xl text-cinema-black capitalize">
            {currentCategory}
          </h1>
          <p className="mt-2 text-sm text-cinema-black/50">
            {categoryProjects.length} {categoryProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => onOpenProject(project)}
              className="group cursor-pointer"
            >
              <div className="aspect-video bg-cinema-gray rounded overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.type === 'link' && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink className="text-white" size={24} />
                  </div>
                )}
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-cinema-black group-hover:text-cinema-black/70 transition-colors line-clamp-2">
                  {project.title}
                </h3>
                <span className="text-xs text-cinema-black/40">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {selectedProject && selectedProject.galleryImages && (
            <Lightbox
              images={selectedProject.galleryImages}
              initialIndex={0}
              onClose={onCloseProject}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Empty state
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <p className="text-cinema-black/40">Select a project from the sidebar</p>
    </div>
  );
};

export default Portfolio;
