import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram } from 'lucide-react';

const Contact = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen bg-cream p-6 md:p-12 lg:p-16 flex flex-col justify-center"
  >
    <div className="max-w-2xl">
      <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl text-cinema-black mb-8">
        Get in Touch
      </h1>

      <p className="text-cinema-black/70 text-lg mb-8 leading-relaxed">
        I'm always interested in hearing about new projects and opportunities.
        Feel free to reach out.
      </p>

      <a
        href="mailto:ashish.stha5@gmail.com"
        className="inline-flex items-center gap-3 text-cinema-black hover:text-cinema-black/70 transition-colors group"
      >
        <Mail size={20} />
        <span className="text-lg">ashish.stha5@gmail.com</span>
      </a>

      {/* Social Links */}
      <div className="mt-12 pt-8 border-t border-cinema-black/10">
        <div className="flex gap-6">
          <a
            href="https://www.instagram.com/theashishshrestha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cinema-black/50 hover:text-cinema-black transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://vimeo.com/ashishshrestha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cinema-black/50 hover:text-cinema-black transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@theashishshrestha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cinema-black/50 hover:text-cinema-black transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

export default Contact;
