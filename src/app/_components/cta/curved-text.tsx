import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MotionValue } from 'motion';

const CurvedText = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] }); // or useScroll({ target: ref }) for local scroll
  const startOffset1 = useTransform(scrollYProgress, [0, 1], [220, 30]);

  return (
    <svg
      ref={ref}
      style={{ translate: '-50%' }}
      className="absolute z-0 overflow-visible bottom-0 left-1/2 w-[120%] text-[2.5rem] font-bold"
      viewBox="0 0 221.66 283.6">
      <path id="Text_Path" d="M 0.5 283.6 V 106 C 0.5 48.7 48.7 5 106 5 H 111.6 C 171.1 5 219.4 48.8 219.4 108.4 V 283.6 H 0.5 Z" fill="none" />
      <text>
        <motion.textPath href="#Text_Path" startOffset={startOffset1}>
          CELEBRATE WITH CAKE
        </motion.textPath>
      </text>
    </svg>
  );
};
export default CurvedText;
