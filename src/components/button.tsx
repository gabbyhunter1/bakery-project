'use client';

import React, { useRef, useState } from 'react';
import { HTMLMotionProps, motion, MotionStyle } from 'motion/react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  text?: string;
  className?: string;
  animationColor?: string;
  hoverColor?: string; // #hex or rgb
}

const Button = ({ text = '', className = '', animationColor = '', hoverColor = '#171717', ...rest }: ButtonProps) => {
  const boxRef = useRef(null);
  const [coords, setCoords] = useState({ x: '0px', y: '0px' });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = boxRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCoords({ x: `${x}px`, y: `${y}px` });
  };

  return (
    <motion.button
      ref={boxRef}
      onMouseMove={handleMouseMove}
      className={`relative cursor-pointer border-2 overflow-hidden mt-4 font-medium text-2xl flex justify-center items-center rounded-[100px] leading-[.9] ${className}`}
      style={{
        '--mouse-x': coords.x,
        '--mouse-y': coords.y,
      }}
      whileHover="hover"
      initial="rest"
      animate="rest"
      {...rest}>
      <motion.div
        className={`bestseller-animated-button ${animationColor}`}
        variants={{
          rest: { scale: 0, x: '-50%', y: '-50%' },
          hover: { scale: 1, x: '-50%', y: '-50%' },
        }}
      />
      <motion.p
        variants={{
          rest: { scale: 1 },
          hover: { scale: 0.9 },
        }}
        className="hover: relative z-10">
        {text}
      </motion.p>
    </motion.button>
  );
};

export default Button;
