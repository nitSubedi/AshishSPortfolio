import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ images, initialIndex, onClose }) => {
  const [index, setIndex] = useState(initialIndex);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index]);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50"
      >
        <X size={32} />
      </button>

      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode='wait'>
          <motion.img 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={images[index]} 
            alt={`Gallery image ${index + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
          />
        </AnimatePresence>
      </div>

      {/* Controls */}
      <button onClick={prevImage} className="absolute left-4 md:left-8 text-white/50 hover:text-white hover:scale-110 transition-all">
        <ChevronLeft size={48} />
      </button>
      <button onClick={nextImage} className="absolute right-4 md:right-8 text-white/50 hover:text-white hover:scale-110 transition-all">
        <ChevronRight size={48} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  );
};

export default Lightbox;