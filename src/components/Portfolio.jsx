import React from 'react';
import { projects } from '../data';
import Lightbox from './Lightbox';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import { thumbUrl, fullUrl } from '../imageUtils';

const Portfolio = ({
  currentProject,
  currentCategory,
  showAbout,
  onOpenProject,
  onImageClick,
  selectedImage,
  onCloseLightbox
}) => {

  // Get projects for category view
  const categoryProjects = currentCategory
    ? projects.filter(p => p.group === currentCategory)
    : [];

  // ABOUT VIEW
  if (showAbout) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen p-6 md:p-12 lg:p-16"
      >
        <div className="max-w-4xl">
          {/* Profile Image and Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 overflow-hidden rounded">
              <img
                src="/pic.JPG"
                alt="Ashish Shrestha"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="heading-serif text-4xl md:text-5xl text-cinema-black mb-4">
                About
              </h1>
              <p className="text-cinema-black/60">
                Director, Cinematographer, Editor
              </p>
            </div>
          </div>

          <div className="space-y-6 text-cinema-black/80 leading-relaxed">
            <p>
              Ashish Shrestha is a documentary filmmaker and cinematographer based in Oxford, Mississippi,
              originally from Nepal. His work centers on observational, visually driven films about people
              and places that are underrepresented. Through his films, he aims to create a positive impact
              on society by bringing overlooked stories to light.
            </p>

            <p>
              He is currently completing his MFA in Documentary Expression at the University of Mississippi.
              Currently he is working on his thesis film, Cotton Thread, which follows Nepali immigrant
              entrepreneur Dipa Bhattarai and her legal fight that changed Mississippi state law.
            </p>

            <p>
              His short film "Jere Allen" — A Lifetime of Passion and Resilience, Painted on Canvas — is an
              intimate portrait of a lifelong painter. The film was selected for the South Georgia Film
              Festival, Oxford Film Festival, Redfish Film Festival, Rising Tide Film Festival, and Jackson
              Doc Fest.
            </p>

            <p>
              Before graduate school, Ashish worked as a cinematographer and editor in Nepal, producing more
              than 45 travel documentaries for digital platforms named "Ghumante". His work reflects his
              experience as a Nepali immigrant in the American South and his commitment to telling grounded,
              human stories with clarity and care.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-cinema-black/10">
            <h3 className="text-sm tracking-wide text-cinema-black/50 mb-4">Contact</h3>
            <a
              href="mailto:ashish.stha5@gmail.com"
              className="text-cinema-black hover:text-cinema-black/70 transition-colors"
            >
              ashish.stha5@gmail.com
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  // SINGLE PROJECT VIEW (Films and Photos)
  if (currentProject) {
    // Photo Gallery Project - show images in grid
    if (currentProject.galleryImages && currentProject.galleryImages.length > 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen p-6 md:p-12 lg:p-16"
        >
          {/* Project Header */}
          <div className="mb-8">
            <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-cinema-black mb-2">
              {currentProject.title}
              {currentProject.subtitle && (
                <span className="block text-lg md:text-xl lg:text-2xl text-cinema-black/50 font-normal mt-1">
                  {currentProject.subtitle}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-4 text-sm text-cinema-black/50 mb-4">
              <span>{currentProject.category}</span>
              <span>•</span>
              <span>{currentProject.year}</span>
            </div>

            {/* Description/Logline */}
            {currentProject.description && (
              <p className="text-cinema-black/70 leading-relaxed max-w-2xl mb-4">
                {currentProject.description}
              </p>
            )}

            {/* PDF Link for Mr. Brown */}
            {currentProject.pdf && (
              <a
                href={currentProject.pdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cinema-black/60 hover:text-cinema-black transition-colors"
              >
                <FileText size={16} />
                View Artist Statement (PDF)
              </a>
            )}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProject.galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => onImageClick(index)}
                className="cursor-pointer group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-cinema-gray">
                  <img
                    src={thumbUrl(image)}
                    alt={`${currentProject.title} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedImage !== null && (
              <Lightbox
                images={currentProject.galleryImages}
                initialIndex={selectedImage}
                onClose={onCloseLightbox}
              />
            )}
          </AnimatePresence>
        </motion.div>
      );
    }

    // Film Project - show video or coming soon
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen p-6 md:p-12 lg:p-16"
      >
        {/* Video/Image Display */}
        <div className="w-full max-w-5xl">
          {currentProject.type === 'vimeo-embed' ? (
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} className="rounded overflow-hidden shadow-lg">
              <iframe
                src={`https://player.vimeo.com/video/${currentProject.vimeoId}?h=${currentProject.vimeoHash}&badge=0&autopause=0&player_id=0&app_id=58479`}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title={currentProject.title}
              />
            </div>
          ) : currentProject.type === 'video' ? (
            <div className="aspect-video bg-cinema-black rounded overflow-hidden shadow-lg">
              <video
                src={currentProject.videoSrc}
                controls
                className="w-full h-full object-cover"
                poster={fullUrl(currentProject.image)}
              />
            </div>
          ) : currentProject.type === 'coming-soon' ? (
            <div className="aspect-video bg-cinema-gray rounded overflow-hidden shadow-lg relative">
              <img
                src={fullUrl(currentProject.image)}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-sm tracking-[0.3em] uppercase">
                  Coming Soon
                </span>
              </div>
            </div>
          ) : currentProject.type === 'link' ? (
            <a
              href={currentProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-video bg-cinema-black rounded overflow-hidden shadow-lg relative group"
            >
              <img
                src={fullUrl(currentProject.image)}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <ExternalLink className="text-white" size={32} />
                </div>
              </div>
            </a>
          ) : null}
        </div>

        {/* Project Info */}
        <div className="mt-8 max-w-3xl">
          <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-cinema-black mb-4">
            {currentProject.title}
            {currentProject.subtitle && (
              <span className="block text-lg md:text-xl lg:text-2xl text-cinema-black/50 font-normal mt-1">
                {currentProject.subtitle}
              </span>
            )}
          </h2>

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

          {currentProject.type === 'link' && (
            <a
              href={currentProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-cinema-black hover:text-cinema-black/70 transition-colors"
            >
              <ExternalLink size={16} />
              Watch on {currentProject.url.includes('vimeo') ? 'Vimeo' : 'YouTube'}
            </a>
          )}
        </div>
      </motion.div>
    );
  }

  // CATEGORY VIEW (Travel, Commercial)
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
                  src={thumbUrl(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
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
      </motion.div>
    );
  }

  // EMPTY STATE
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <p className="text-cinema-black/40">Select a project from the sidebar</p>
    </div>
  );
};

export default Portfolio;
