import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Linkedin, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { projects } from '../data';

const Sidebar = ({ onProjectSelect, onReset }) => { // <--- Added onReset prop
  const [isWorkOpen, setIsWorkOpen] = useState(true);
  
  // State to track which sub-categories are open (Default: all open)
  const [openCategories, setOpenCategories] = useState({
    film: false,
    photos: false,
    sports: false,
    commercial: false,
    travel: false
  });

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Helper to group projects
  const groupedProjects = projects.reduce((acc, project) => {
    const group = project.group || 'others';
    if (!acc[group]) acc[group] = [];
    acc[group].push(project);
    return acc;
  }, {});

  const categories = ['film', 'travel', 'commercial', 'photos', 'sports'];

  return (
    <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-1/3 lg:w-1/4 bg-cinema-black border-r border-white/10 p-10 justify-between z-20">
      <div className="space-y-12">
        {/* LOGO LINK: Now calls onReset to clear state and go to Hero */}
        <Link 
          to="/" 
          onClick={onReset} 
          className="block text-3xl font-bold tracking-tighter uppercase mix-blend-difference cursor-pointer"
        >
          Ashish Shrestha
        </Link>
        
        <nav className="flex flex-col gap-4 text-sm tracking-widest uppercase text-gray-400">
          
          <div className="flex flex-col gap-2">
            {/* Main WORK Toggle */}
            <button 
              onClick={() => setIsWorkOpen(!isWorkOpen)}
              className="hover:text-white transition-colors flex items-center gap-2 group text-left uppercase tracking-widest"
            >
              Works
              {isWorkOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {/* Categorized Project List */}
            {isWorkOpen && (
              <div className="flex flex-col gap-4 pl-4 pt-4 border-l border-white/10 ml-1">
                {categories.map((category) => (
                  groupedProjects[category] && (
                    <div key={category} className="space-y-1">
                      {/* Sub-Category Toggle */}
                      <button 
                        onClick={() => toggleCategory(category)}
                        className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white/80 uppercase tracking-widest mb-1 transition-colors"
                      >
                        {openCategories[category] ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                        {category}
                      </button>

                      {/* Projects in Category */}
                      {openCategories[category] && (
                        <div className="pl-3 space-y-2 border-l border-white/5 ml-1">
                          {groupedProjects[category].map((project) => (
                            <button
                              key={project.id}
                              onClick={() => onProjectSelect(project)}
                              className="text-xs text-left block text-gray-500 hover:text-white hover:translate-x-1 transition-all uppercase tracking-wide w-full"
                            >
                              {project.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2 group mt-2">
            Contact <ArrowRight className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" size={14} />
          </Link>
        </nav>
      </div>

      <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
<h2 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/20 pb-2">About Me</h2>
<div className="text-gray-400 text-sm leading-relaxed space-y-4">
<p>I am a documentary filmmaker, cinematographer, and editor based in Oxford, Mississippi.</p>
<p>Currently an MFA candidate in Documentary Expression at the University of Mississippi, I also work with the Center for the Study of Southern Culture.</p>
<p>Before moving to the US, I spent five years traveling rural Nepal with Ghumante, shooting and editing over 45 long-form travel documentaries focused on landscapes, traditions, and local voices.</p>
<p className="italic text-gray-500">Current Thesis: "Cotton Thread on Cotton Belt"</p>
</div>
<div className="text-xs text-gray-500 pt-2">
<p>MFA Documentary Expression — University of Mississippi</p>
</div>
</div>

<div className="space-y-6 pt-6">
  <div className="flex gap-6 text-gray-400">

    <a href="https://www.instagram.com/ashish.5tha" target="_blank" rel="noopener noreferrer">
      <Instagram className="hover:text-white cursor-pointer transition-colors" size={20} />
    </a>

    {/* LinkedIn */}
    <a href="https://www.linkedin.com/in/ashish5tha?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
      <Linkedin className="hover:text-white cursor-pointer transition-colors" size={20} />
    </a>

    {/* Email */}
    <a href="mailto:ashish.stha5@gmail.com">
      <Mail className="hover:text-white cursor-pointer transition-colors" size={20} />
    </a>

  </div>
  <p className="text-[10px] text-gray-600 uppercase tracking-widest">© 2026 Ashish Shrestha. All rights reserved.</p>
</div>
</aside>
  );
};

export default Sidebar;