'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const AnimatedPath = () => {
  const controls = useAnimation();
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const pathEl = pathRef.current;
    const endPath = pathEl?.getAttribute('data-end-path');

    if (endPath) {
      controls.start({
        d: endPath,
        transition: {
          duration: 1.5,
          ease: [0.28, 0.71, 0, 0.98],
        },
      });
    }
  }, [controls]);

  return (
    <svg className="max-md:hidden fixed top-0 pointer-events-none left-0 z-[999]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 277">
      <motion.path
        ref={pathRef}
        d="M 0 0 h 342 v 300 S 110 515 0 270 V 0 Z" // initial d or a flat sha\pe
        data-end-path="M 0 0 h 342 v 0 S 272 -116 0 0 V 0 Z"
        animate={controls}
        fill="white"
      />
    </svg>
  );
};

export default AnimatedPath;
