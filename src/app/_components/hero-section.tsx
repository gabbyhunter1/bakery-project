'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import WordsReveal from '@/components/WordsReveal';

const HeroSection = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const borderRadius = useTransform(scrollYProgress, [0, 1], ['0%', '5rem']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const stickerY = useTransform(scrollYProgress, [0, 1], ['0', '-90%']);

  const MotionImage = motion.create(Image);

  return (
    <section id={'hero-section'}>
      <motion.div ref={containerRef} className="relative w-screen max-md:h-[75vh] h-screen overflow-hidden bg-black" style={{ borderRadius }}>
        <MotionImage
          src={'/bernicefrontcounter.png'}
          alt={'d'}
          priority
          fill
          className="object-cover opacity-75"
          style={{ scale: imageScale, willChange: 'transform' }}
        />
        <motion.div className="p-[5vw] h-full flex items-end" style={{ y: headerY }}>
          <div className="relative flex max-md:pb-10 max-md:flex-col max-md:justify-end max-md:items-start max-md:gap-8 items-center justify-between w-full">
            <div className="relative w-[85%]">
              <WordsReveal
                text={'A BAKING LOVE AFFAIR'}
                className="max-md:text-[15vw] text-[12vw] leading-none font-black text-white"
                delay={0.1}
                duration={0.5}
                stagger={0.14}
                threshold={0.3}
              />
            </div>
            <motion.div
              style={{ y: stickerY, rotate: '30deg' }}
              className="max-md:static  max-md:order-first absolute bottom-[12%] left-[80%] bg-[#ffa7ee] rounded-[50%] aspect-[1] flex items-center justify-center">
              <a href="#" className="max-md:p-6 p-12 max-md:text-xl text-4xl font-bold text-white">
                Indulge
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
