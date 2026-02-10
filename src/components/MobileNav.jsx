import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { projects } from '../data';

const HERO_GRID_CATEGORIES = ['travel', 'commercial'];

const MobileNav = ({ onReset, onProjectSelect, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWorkOpen, setIsWorkOpen] = useState(true);

  // State for sub-categories
  const [openCategories, setOpenCategories] = useState({
    film: false,
    photos: false,
    commercial: false,
    travel: false,
  });

  const categories = ['film', 'travel', 'commercial', 'photos'];

  // Helper to group projects
  const groupedProjects = projects.reduce((acc, project) => {
    const group = project.group || 'others';
    if (!acc[group]) acc[group] = [];
    acc[group].push(project);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleCategoryClick = (category) => {
    if (HERO_GRID_CATEGORIES.includes(category)) {
      setIsOpen(false); // Close mobile menu
      if (onCategorySelect) onCategorySelect(category);
    } else {
      toggleCategory(category);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    setIsOpen(false);
    if (onReset) onReset();
  };

  const handleProjectClick = (project) => {
    setIsOpen(false);
    if (onProjectSelect) onProjectSelect(project);
  };

  return (
    <nav className="md:hidden fixed w-full z-40 top-0 left-0 p-6 flex justify-between items-center bg-cinema-black/90 backdrop-blur-md border-b border-white/10">
      {/* LOGO: Resets to Hero */}
      <Link 
        to="/" 
        onClick={handleLogoClick}
        className="text-xl font-bold tracking-tighter uppercase"
      >
        Ashish S.
      </Link>

      <button onClick={() => setIsOpen(!isOpen)} className="text-white">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-cinema-black flex flex-col p-8 gap-8 overflow-y-auto z-50">
          
          <div className="space-y-6">
             <h3 className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/10 pb-2">Menu</h3>
             
             {/* MENU ITEMS */}
             <div className="flex flex-col gap-4">
               
               {/* COLLAPSIBLE WORK SECTION */}
               <div>
                 <button 
                    onClick={() => setIsWorkOpen(!isWorkOpen)}
                    className="flex items-center gap-2 text-2xl uppercase font-bold hover:text-gray-300 transition-colors"
                 >
                   Work
                   {isWorkOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                 </button>

                 {isWorkOpen && (
                   <div className="flex flex-col gap-4 pl-4 pt-4 border-l border-white/10 ml-1 mt-2">
                     {categories.map((category) =>
                       groupedProjects[category] && (
                         <div key={category} className="space-y-2">
                           {/* Sub-Category Toggle */}
                           <button
                             onClick={() => handleCategoryClick(category)}
                             className="flex items-center gap-2 text-sm font-bold text-white/60 uppercase tracking-widest transition-colors"
                           >
                             {/* Only show chevron for expandable categories */}
                             {!HERO_GRID_CATEGORIES.includes(category) && (
                               openCategories[category] ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                             )}
                             {category}
                           </button>

                           {/* Project List - only for non-hero-grid categories */}
                           {!HERO_GRID_CATEGORIES.includes(category) && openCategories[category] && (
                             <div className="pl-4 space-y-3 border-l border-white/5 ml-1">
                               {groupedProjects[category].map((project) => (
                                 <button
                                   key={project.id}
                                   onClick={() => handleProjectClick(project)}
                                   className="text-sm text-left block text-gray-400 hover:text-white uppercase tracking-wide w-full"
                                 >
                                   {project.title}
                                 </button>
                               ))}
                             </div>
                           )}
                         </div>
                       )
                     )}
                   </div>
                 )}
               </div>

               {/* CONTACT LINK */}
               <Link 
                 to="/contact" 
                 onClick={handleLinkClick}
                 className="text-2xl uppercase font-bold hover:text-gray-300 transition-colors"
               >
                 Contact
               </Link>
             </div>
          </div>

          <div className="space-y-4 pt-8 border-t border-white/10 mt-auto">
            <h3 className="text-gray-500 text-xs uppercase tracking-widest">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Documentary filmmaker based in Oxford, MS. Currently an MFA candidate at the University of Mississippi.
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;