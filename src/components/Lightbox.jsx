import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ images, initialIndex, onClose }) => {
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

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

  // Lock body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only swipe if horizontal movement exceeds vertical (not a scroll)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) prevImage();
      else nextImage();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
      >
        <X size={28} />
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
            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl select-none"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Controls - hidden on mobile (use swipe instead) */}
      <button onClick={prevImage} className="hidden md:block absolute left-4 md:left-8 text-white/50 hover:text-white hover:scale-110 transition-all">
        <ChevronLeft size={48} />
      </button>
      <button onClick={nextImage} className="hidden md:block absolute right-4 md:right-8 text-white/50 hover:text-white hover:scale-110 transition-all">
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