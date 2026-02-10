import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

const Home = ({ featuredProject, visibleGroup, selectedProject, onOpenProject, onCloseProject, heroGridCategory }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {/* Show Hero if no featuredProject OR if showing hero grid */}
    {(!featuredProject || heroGridCategory) && <Hero heroGridCategory={heroGridCategory} />}

    {/* Only show Portfolio if NOT in hero grid mode */}
    {!heroGridCategory && (
      <Portfolio
        featuredProject={featuredProject}
        visibleGroup={visibleGroup}
        selectedProject={selectedProject}
        onOpenProject={onOpenProject}
        onCloseProject={onCloseProject}
      />
    )}
    <footer className="md:hidden py-12 border-t border-white/10 text-center">
      <p className="text-xs text-gray-600 uppercase tracking-widest">© 2026 Ashish Shrestha. All rights reserved.</p>
    </footer>
  </motion.div>
);

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Content State
  const [featuredProject, setFeaturedProject] = useState(null);
  const [visibleGroup, setVisibleGroup] = useState(null);
  const [heroGridCategory, setHeroGridCategory] = useState(null);

  // 2. Overlay State (Video Modal / Lightbox)
  const [selectedProject, setSelectedProject] = useState(null);

  // --- NEW: RESET HANDLER ---
  const handleReset = () => {
    // 1. Reset URL to home
    if (location.pathname !== '/') navigate('/');

    // 2. Clear all states to show original Hero
    setFeaturedProject(null);
    setVisibleGroup(null);
    setSelectedProject(null);
    setHeroGridCategory(null);

    // 3. Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for category-level clicks (Travel, Commercial)
  const handleCategorySelect = (categoryName) => {
    if (location.pathname !== '/') navigate('/');
    setHeroGridCategory(categoryName);
    setFeaturedProject(null);
    setVisibleGroup(null);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSidebarSelection = (project) => {
    if (location.pathname !== '/') navigate('/');

    if (project.group === 'film') {
      setFeaturedProject(project);
      setVisibleGroup(null);
      setSelectedProject(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setVisibleGroup(project.group);
      setFeaturedProject(null);
      setSelectedProject(null);
      setTimeout(() => {
         window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleCardClick = (project) => {
    if (project.type === 'video') {
      setSelectedProject(project); 
    } else if (project.galleryImages) {
      setSelectedProject(project); 
    } else if (project.type === 'link') {
      window.open(project.url, '_blank');
    }
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className="bg-cinema-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      {/* PASS THE RESET PROP HERE */}
      <Sidebar
        onProjectSelect={handleSidebarSelection}
        onCategorySelect={handleCategorySelect}
        onReset={handleReset}
      />

      <MobileNav
        onReset={handleReset}
        onProjectSelect={handleSidebarSelection}
        onCategorySelect={handleCategorySelect}
      />

      <main className="md:ml-[33.33%] lg:ml-[25%] relative w-full md:w-2/3 lg:w-3/4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Home
                  featuredProject={featuredProject}
                  visibleGroup={visibleGroup}
                  selectedProject={selectedProject}
                  onOpenProject={handleCardClick}
                  onCloseProject={handleCloseProject}
                  heroGridCategory={heroGridCategory}
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