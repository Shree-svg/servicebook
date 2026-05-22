import React from 'react';
import { motion } from 'framer-motion';

// This component renders a full‑screen animated pastel gradient background.
// It uses CSS classes defined in index.css (animated-bg) and adds a subtle
// Framer Motion opacity pulse for extra life.

const AnimatedBackground = () => (
  <motion.div
    className="fixed inset-0 z-[-1] animated-bg"
    initial={{ opacity: 0.7 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
  />
);

export default AnimatedBackground;
