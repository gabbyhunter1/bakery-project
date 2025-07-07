'use client';

import { motion, useInView, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import Image from 'next/image';
import { useScroll } from 'framer-motion';
import LineReveal from '@/app/_components/line-reveal';

const DescriptionSection = ({ heading, description }: { heading: string; description: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);

  const revealDelay = 0.4;

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

export default DescriptionSection;
