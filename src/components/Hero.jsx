import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail } from 'lucide-react';

const Hero = ({ onEnterSite }) => {
  return (
    <section className="cover-page">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Centered Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-serif text-5xl md:text-7xl lg:text-8xl text-white mb-4"
        >
          ashish shrestha
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-white/80 mb-12"
        >
          Director, Cinematographer, Editor
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={onEnterSite}
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-white hover:text-white/70 transition-colors"
        >
          Click Here
        </motion.button>
      </div>

      {/* Bottom Social Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-6"
      >
        <a
          href="https://www.instagram.com/theashishshrestha"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
        >
          <Instagram size={20} />
        </a>
        <a
          href="https://vimeo.com/ashishshrestha"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
          </svg>
        </a>
        <a
          href="https://www.youtube.com/@theashishshrestha"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
        <a
          href="mailto:ashish.stha5@gmail.com"
          className="text-white/60 hover:text-white transition-colors"
        >
          <Mail size={20} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
