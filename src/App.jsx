import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import Sidebar from './components/Sidebar';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import { projects } from './data';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const firstFilm = projects.find(p => p.group === 'film');

  // Current selected project
  const [currentProject, setCurrentProject] = useState(firstFilm || null);

  // Current category view (travel, commercial)
  const [currentCategory, setCurrentCategory] = useState(null);

  // Show about section
  const [showAbout, setShowAbout] = useState(false);

  // Overlay state for lightbox
  const [selectedImage, setSelectedImage] = useState(null);

  // Mobile sidebar open/close
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTitleClick = () => {
    if (location.pathname !== '/') navigate('/');
    const firstFilm = projects.find(p => p.group === 'film');
    if (firstFilm) {
      setCurrentProject(firstFilm);
    }
    setCurrentCategory(null);
    setShowAbout(false);
    setSelectedImage(null);
    setMobileMenuOpen(false);
  };

  const handleProjectSelect = (project) => {
    if (location.pathname !== '/') navigate('/');
    setCurrentProject(project);
    setCurrentCategory(null);
    setShowAbout(false);
    setSelectedImage(null);
    setMobileMenuOpen(false);
  };

  const handleCategorySelect = (category) => {
    if (location.pathname !== '/') navigate('/');
    setCurrentCategory(category);
    setCurrentProject(null);
    setShowAbout(false);
    setSelectedImage(null);
    setMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    if (location.pathname !== '/') navigate('/');
    setShowAbout(true);
    setCurrentProject(null);
    setCurrentCategory(null);
    setSelectedImage(null);
    setMobileMenuOpen(false);
  };

  const handleOpenProject = (project) => {
    if (project.type === 'link') {
      window.open(project.url, '_blank');
    }
  };

  const handleImageClick = (imageIndex) => {
    setSelectedImage(imageIndex);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  // Main layout with sidebar
  return (
    <div className="min-h-screen bg-cream">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          onProjectSelect={handleProjectSelect}
          onCategorySelect={handleCategorySelect}
          onAboutClick={handleAboutClick}
          onTitleClick={handleTitleClick}
          currentProject={currentProject}
          currentCategory={currentCategory}
          showAbout={showAbout}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-black/30 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.33, 0, 0.2, 1] }}
              className="md:hidden fixed left-0 top-0 h-screen w-[280px] z-50"
            >
              <Sidebar
                onProjectSelect={handleProjectSelect}
                onCategorySelect={handleCategorySelect}
                onAboutClick={handleAboutClick}
                onTitleClick={handleTitleClick}
                currentProject={currentProject}
                currentCategory={currentCategory}
                showAbout={showAbout}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Semi-Circle Trigger */}
      {!mobileMenuOpen && (
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 w-6 h-12 bg-cinema-black/80 rounded-r-full flex items-center justify-center active:bg-cinema-black transition-colors"
          aria-label="Open menu"
        >
          <ChevronRight size={16} className="text-white ml-[-2px]" />
        </button>
      )}

      {/* Main Content */}
      <main className="md:ml-[280px] lg:ml-[320px] min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Portfolio
                  currentProject={currentProject}
                  currentCategory={currentCategory}
                  showAbout={showAbout}
                  onOpenProject={handleOpenProject}
                  onImageClick={handleImageClick}
                  selectedImage={selectedImage}
                  onCloseLightbox={handleCloseLightbox}
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <AppContent />
  </Router>
);

export default AppWrapper;
