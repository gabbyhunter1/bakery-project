'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

const WordsReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  stagger = 0.05,
  threshold = 0.5,
  triggerOnce = true,
}) => {
  const [wordPositions, setWordPositions] = useState<
    Array<{
      word: string;
      lineIndex: number;
      wordIndex: number;
    }>
  >([]);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLHeadingElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);

  const calculateWordPositions = () => {
    if (!containerRef.current || !hiddenRef.current) return;

    const container = containerRef.current;
    const hidden = hiddenRef.current;
    const containerWidth = container.clientWidth;

    // Reset hidden element
    hidden.innerHTML = '';
    hidden.style.width = `${containerWidth}px`;

    const words = text.split(' ');
    const lines: string[] = [];
    const positions: Array<{
      word: string;
      lineIndex: number;
      wordIndex: number;
    }> = [];

    let currentLine = '';
    let currentLineIndex = 0;

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
        // Line is too wide, start new line
        lines.push(currentLine);
        currentLine = words[i];
        currentLineIndex++;
      } else {
        currentLine = testLine;
      }

      // Track each word's position
      positions.push({
        word: words[i],
        lineIndex: currentLineIndex,
        wordIndex: i,
      });
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    hidden.removeChild(tempSpan);
    setWordPositions(positions);
    setIsReady(true);
  };

  useEffect(() => {
    setIsReady(false);
    calculateWordPositions();

    const handleResize = () => {
      setIsReady(false);
      calculateWordPositions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [text]);

  const containerVariants = {
    hidden: {},
    visible: {},
  };

  // Create word variants with individual delays
  const createWordVariants = (wordIndex: number) => ({
    hidden: {
      y: '100%',
    },
    visible: {
      y: 0,
      transition: {
        duration: duration,
        delay: delay + wordIndex * stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  });

  // Group words by line for proper rendering
  const groupedWords = wordPositions.reduce(
    (acc, wordPos) => {
      if (!acc[wordPos.lineIndex]) {
        acc[wordPos.lineIndex] = [];
      }
      acc[wordPos.lineIndex].push(wordPos);
      return acc;
    },
    {} as Record<number, typeof wordPositions>
  );

  return (
    <>
      <motion.h1
        ref={containerRef}
        className={`overflow-hidden ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate={isReady ? 'visible' : 'hidden'}>
        {Object.keys(groupedWords).map(lineIndexStr => {
          const lineIndex = parseInt(lineIndexStr);
          const wordsInLine = groupedWords[lineIndex];

          return (
            <span key={lineIndex} className="block overflow-hidden">
              {wordsInLine.map((wordPos, index) => (
                <React.Fragment key={wordPos.wordIndex}>
                  <motion.span className="inline-block mr-[.3em] origin-top-left" variants={createWordVariants(wordPos.wordIndex)}>
                    {wordPos.word}
                  </motion.span>
                </React.Fragment>
              ))}
            </span>
          );
        })}
      </motion.h1>

      {/* Hidden element for measuring text */}
      <div ref={hiddenRef} className={`fixed top-0 left-0 pointer-events-none opacity-0 ${className}`} style={{ zIndex: -1 }} aria-hidden="true" />
    </>
  );
};

export default WordsReveal;
