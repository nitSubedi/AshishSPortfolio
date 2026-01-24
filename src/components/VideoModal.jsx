import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const VideoModal = ({ videoSrc, onClose }) => {
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // FIX: Changed z-50 to z-[100] to cover the sidebar
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose} 
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
      >
        <X size={32} />
      </button>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-6xl aspect-video bg-black shadow-2xl relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <video 
          src={videoSrc} 
          className="w-full h-full object-contain"
          controls 
          autoPlay 
          playsInline
        />
      </motion.div>
    </motion.div>
  );
};

export default VideoModal;