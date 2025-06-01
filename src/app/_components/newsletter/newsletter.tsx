'use client';

import React, { useRef } from 'react';
import LineReveal from '@/app/_components/demo';
import Button from '@/components/button';
import { motion, useTransform } from 'motion/react';
import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';

const Newsletter = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const leftImageY = useTransform(scrollYProgress, [0, 1], ['-50%', '100%']);
  const rightImageY = useTransform(scrollYProgress, [0, 1], ['50%', '-100%']);

  return (
    <div
      ref={ref}
      className="relative max-sm:w-full sm:min-w-[600px] w-[65%] mx-auto rounded-[2rem] bg-[var(--blue)] px-8 py-16 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <LineReveal
          delay={0.2}
          text={'GET 15% OFF YOUR FIRST ORDER'}
          className="max-sm:text-3xl sm:text-5xl md:text-6xl text-center font-black text-white"
        />
      </div>
      <p className="text-white my-10">Subscribe to our newsletter and get 15% off your first purchase!</p>
      <div className="flex justify-center items-center gap-2 min-w-[350px]">
        <input
          className="bg-[var(--pink)] rounded-full py-4 px-5 text-white placeholder-white placeholder:font-medium"
          type={'email'}
          placeholder={'EMAIL'}
          required
        />
        <Button
          text={'JOIN'}
          className={'w-full flex-grow-0 py-4 text-lg border-[var(--dark)] bg-[var(--dark)] text-white hover:text-black !mt-0'}
          animationColor={'bg-[var(--background)]'}
        />
      </div>

      <div className="max-md:hidden">
        <motion.div style={{ y: leftImageY, x: '-50%' }} className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <Image src={'/drawn-cake.svg'} alt={''} width={140} height={140} />
          </div>
        </motion.div>
        <motion.div style={{ y: rightImageY, x: '50%' }} className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
          <div className="relative">
            <Image src={'/floating-cake.svg'} alt={''} width={140} height={140} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Newsletter;
