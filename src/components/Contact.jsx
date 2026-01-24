import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="h-screen flex items-center justify-center px-6"
  >
    <div className="text-center space-y-8">
      <h1 className="text-5xl md:text-7xl font-bold">LET'S TALK</h1>
      <p className="text-gray-400 text-lg">ashish.stha5@gmail.com</p>
    </div>
  </motion.div>
);

export default Contact;