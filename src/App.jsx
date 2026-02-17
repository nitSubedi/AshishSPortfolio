import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import { projects } from './data';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Track if user has entered the site (clicked "CLICK HERE")
  const [hasEntered, setHasEntered] = useState(false);

  // Current selected project
  const [currentProject, setCurrentProject] = useState(null);

  // Current category view (travel, commercial, photos)
  const [currentCategory, setCurrentCategory] = useState(null);

  // Overlay state for video/gallery
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEnterSite = () => {
    setHasEntered(true);
    // Default to first film project
    const firstFilm = projects.find(p => p.group === 'film');
    if (firstFilm) {
      setCurrentProject(firstFilm);
    }
  };

  const handleProjectSelect = (project) => {
    if (location.pathname !== '/') navigate('/');
    setCurrentProject(project);
    setCurrentCategory(null);
    setSelectedProject(null);
  };

  const handleCategorySelect = (category) => {
    if (location.pathname !== '/') navigate('/');
    setCurrentCategory(category);
    setCurrentProject(null);
    setSelectedProject(null);
  };

  const handleOpenProject = (project) => {
    if (project.type === 'link') {
      window.open(project.url, '_blank');
    } else {
      setSelectedProject(project);
    }
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  // Show cover page if hasn't entered yet
  if (!hasEntered && location.pathname === '/') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Hero onEnterSite={handleEnterSite} />
        </motion.div>
      </AnimatePresence>
    );
  }

  // Main layout with sidebar
  return (
    <div className="min-h-screen bg-cream">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar
          onProjectSelect={handleProjectSelect}
          onCategorySelect={handleCategorySelect}
          currentProject={currentProject}
        />
      </div>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-cream z-40 p-4 border-b border-cinema-black/10">
        <h1 className="heading-serif text-2xl text-cinema-black">ashish shrestha</h1>
      </header>

      {/* Main Content */}
      <main className="md:ml-[280px] lg:ml-[320px] min-h-screen pt-16 md:pt-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Portfolio
                  currentProject={currentProject}
                  currentCategory={currentCategory}
                  selectedProject={selectedProject}
                  onOpenProject={handleOpenProject}
                  onCloseProject={handleCloseProject}
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
