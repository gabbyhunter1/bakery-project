'use client';

import React, { useRef } from 'react';
import LineReveal from '@/app/_components/demo';
import { motion, useScroll, useTransform } from 'framer-motion';
import Arch from '@/app/_components/arches-display/arch';
import { useInView } from 'motion/react';

const ArchesDisplay = () => {
  const ref = useRef(null);
  const archRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const isInView = useInView(archRef, { once: true });

  const containerVariants = {
    initial: {},
    show: {
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0 },
    show: {
      scale: 1,
      transition: {
        duration: 1.6,
        ease: [0.28, 0.71, 0, 0.98],
      },
    },
  };

  const archesArray = [
    <motion.div
      key={crypto.randomUUID()}
      ref={archRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className="flex items-end gap-10 arches-animation">
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch fullHeight={false} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch fullHeight={false} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch fullHeight={false} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch fullHeight={false} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch fullHeight={false} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch fullHeight={false} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Arch />
      </motion.div>
    </motion.div>,
  ];

  return (
    <section className="my-12">
      <motion.div ref={ref} style={{ y }} className="relative">
        <LineReveal
          text="THE BEST THINGS IN LIFE ARE SWEET"
          className={'text-4xl px-4 sm:text-5xl md:text-6xl lg:text-8xl text-center font-black leading-[.9]'}
          triggerOnce={true}
        />
      </motion.div>
      <div className="overflow-hidden">
        <motion.div className="relative w-max overflow-x-hidden max-sm:mt-8 mt-20">{archesArray[0]}</motion.div>
      </div>
    </section>
  );
};

export default ArchesDisplay;
