import { useState } from 'react';
import { Mail, ChevronDown, ChevronRight } from 'lucide-react';
import { projects } from '../data';

const Sidebar = ({ onProjectSelect, onCategorySelect, onAboutClick, currentProject, currentCategory, showAbout }) => {
  const [photosExpanded, setPhotosExpanded] = useState(false);

  const filmProjects = projects.filter(p => p.group === 'film');
  const photoProjects = projects.filter(p => p.group === 'photos');

  const handlePhotosClick = () => {
    setPhotosExpanded(!photosExpanded);
  };

  const handlePhotoProjectClick = (project) => {
    onProjectSelect(project);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] lg:w-[320px] bg-cream p-8 lg:p-12 flex flex-col z-40 overflow-y-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="heading-serif text-4xl lg:text-5xl text-cinema-black mb-2">
          ashish shrestha
        </h1>
        <p className="text-sm tracking-wide text-cinema-black/60">
          Director, Cinematographer, Editor
        </p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav flex-1">
        {/* Films Section */}
        <div className="mb-8">
          <span className="section-title block mb-3">films</span>
          <div className="space-y-1">
            {filmProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => onProjectSelect(project)}
                className={`block text-left w-full ${
                  currentProject?.id === project.id
                    ? 'text-cinema-black font-medium'
                    : ''
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 space-y-2">
          <button
            onClick={() => onCategorySelect('travel-films')}
            className={`block ${currentCategory === 'travel-films' ? 'text-cinema-black font-medium' : ''}`}
          >
            travel-films
          </button>
          <button
            onClick={() => onCategorySelect('other')}
            className={`block ${currentCategory === 'other' ? 'text-cinema-black font-medium' : ''}`}
          >
            other
          </button>
        </div>

        {/* Photos Section - Collapsible */}
        <div className="mb-8">
          <button
            onClick={handlePhotosClick}
            className={`flex items-center gap-2 ${photosExpanded || currentProject?.group === 'photos' ? 'text-cinema-black font-medium' : ''}`}
          >
            {photosExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            photos
          </button>

          {/* Expanded photo projects */}
          {photosExpanded && (
            <div className="ml-5 mt-2 space-y-1">
              {photoProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handlePhotoProjectClick(project)}
                  className={`block text-left w-full text-sm ${
                    currentProject?.id === project.id
                      ? 'text-cinema-black font-medium'
                      : 'text-cinema-black/60'
                  }`}
                >
                  {project.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* About */}
        <div className="mb-8">
          <button
            onClick={onAboutClick}
            className={`block ${showAbout ? 'text-cinema-black font-medium' : ''}`}
          >
            about
          </button>
        </div>
      </nav>

      {/* Social Icons */}
      <div className="pt-8 border-t border-cinema-black/10">
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/theashishshrestha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cinema-black/50 hover:text-cinema-black transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="https://vimeo.com/ashishshrestha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cinema-black/50 hover:text-cinema-black transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@theashishshrestha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cinema-black/50 hover:text-cinema-black transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a
            href="mailto:ashish.stha5@gmail.com"
            className="text-cinema-black/50 hover:text-cinema-black transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
