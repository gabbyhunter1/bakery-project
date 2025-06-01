'use client';

import { motion, useInView, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import Image from 'next/image';
import { useScroll } from 'framer-motion';
import LineReveal from '@/app/_components/demo';

const DescriptionSection = ({ heading, description }: { heading: string; description: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);
  const CakeImage = motion.create(Image);

  const revealDelay = 0.4;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: revealDelay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '100%', rotate: 12 },
    visible: {
      y: '0%',
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const words = groupWords(heading, 2);

  return (
    <section className="text-[#147c98] relative flex max-md:flex-col max-md:gap-4 gap-10 section-padding">
      <div className="font-black relative max-md:text-3xl max-md:w-full md:w-[calc(60%-1rem)] text-[4.2rem]">
        <LineReveal text={heading} />
      </div>
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: revealDelay, duration: 0.6, ease: 'easeOut' }}
        className="text-3xl max-sm:text-2xl md:w-[45%]">
        {description}
      </motion.p>

      <motion.div style={{ y }} className="absolute top-full ml-16">
        <Image src={`/drawn-cake.svg`} alt={''} width={160} height={160} />
      </motion.div>
    </section>
  );
};

const groupWords = (text: string, groupSize = 2) => {
  const words = text.split(' ');
  const groups = [];
  for (let i = 0; i < words.length; i += groupSize) {
    groups.push(words.slice(i, i + groupSize).join(' '));
  }
  return groups;
};

export default DescriptionSection;
