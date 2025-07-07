'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'motion/react';

interface LineRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

const LineReveal: React.FC<LineRevealProps> = ({ text, className = '', delay = 0.4, stagger = 0.1, triggerOnce = true }) => {
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLHeadingElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, {
    once: triggerOnce,
  });

  const calculateLines = useCallback(() => {
    if (!containerRef.current || !hiddenRef.current) return;

    const container = containerRef.current;
    const hidden = hiddenRef.current;
    const containerWidth = container.clientWidth;

    // Reset hidden element
    hidden.innerHTML = '';
    hidden.style.width = `${containerWidth}px`;

    const words = text.split(' ');
    const newLines: string[] = [];
    let currentLine = '';

    // Create a temporary span to measure text width
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.className = container.className;
    hidden.appendChild(tempSpan);

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
      tempSpan.textContent = testLine;

      if (tempSpan.offsetWidth > containerWidth && currentLine) {
        newLines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      newLines.push(currentLine);
    }

    hidden.removeChild(tempSpan);
    setLines(newLines);
  }, [text]);

  useEffect(() => {
    calculateLines();

    const handleResize = () => {
      calculateLines();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [text]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const lineVariants = {
    hidden: { y: '100%', rotate: 12 },
    visible: {
      y: '0%',
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.28, 0.71, 0, 0.98],
      },
    },
  };

  return (
    <>
      <motion.h1
        ref={containerRef}
        className={`overflow-hidden ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}>
        {lines.map((line, index) => (
          <span key={index} className="block overflow-hidden">
            <motion.span className="block origin-top-left" variants={lineVariants}>
              {line}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      {/* Hidden element for measuring text */}
      <div ref={hiddenRef} className={`fixed top-0 left-0 pointer-events-none opacity-0 ${className}`} style={{ zIndex: -1 }} aria-hidden="true" />
    </>
  );
};

export default LineReveal;
