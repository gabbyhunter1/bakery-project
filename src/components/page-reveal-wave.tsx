'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PageRevealWave: React.FC = () => {
  const [isRevealing, setIsRevealing] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    // Set initial dimensions and handle resize
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Start the reveal animation on mount
    const timer = setTimeout(() => {
      setIsRevealing(false);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Create wave path - starts flat, then creates a subtle upward curve
  const createWavePath = (progress: number, width: number, height: number) => {
    // Wave parameters
    const waveHeight = 60 * (1 - progress); // Wave diminishes as it progresses
    const frequency = 0.004; // How many waves across the width

    let path = `M 0,${height}`;

    // Create the wave curve
    for (let x = 0; x <= width; x += 10) {
      const y = height - height * progress + Math.sin(x * frequency) * waveHeight;
      path += ` L ${x},${y}`;
    }

    // Complete the path
    path += ` L ${width},${height} L 0,${height} Z`;

    return path;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
      {/* Wave overlay */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: isRevealing ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 2 }}>
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
          <motion.path
            fill="white"
            initial={{
              d: createWavePath(0, dimensions.width, dimensions.height),
            }}
            animate={{
              d: createWavePath(1, dimensions.width, dimensions.height),
            }}
            transition={{
              duration: 2,
              ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for smooth easing
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default PageRevealWave;
