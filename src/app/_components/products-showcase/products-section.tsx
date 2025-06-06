'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BestsellerDisplay from '@/app/_components/bestsellers/bestseller-display';
import Button from '@/components/button';
import { products } from '@/app/data/products';

const ProductsSection = () => {
  const [activeSection, setActiveSection] = useState<'cookies' | 'cakes'>('cookies');

  const cookies = products.slice(0, 6);
  const cakes = products.slice(7);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: '100%', rotate: '15deg' },
    visible: { y: 0, rotate: '0deg', transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { y: '100%', rotate: '15deg', transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <>
      <div className="flex gap-4 mb-16">
        <Button
          onClick={() => setActiveSection('cookies')}
          className={`px-8 py-4 ${activeSection === 'cookies' ? 'bg-[#112229] text-white ' : 'text-[#171717]'} hover:text-white border-[#112229] `}
          animationColor={'bg-[#112229]'}
          text={'COOKIES'}
        />
        <Button
          onClick={() => setActiveSection('cakes')}
          className={`px-8 py-4 border-[var(--pink)] ${activeSection == 'cakes' ? 'bg-[var(--pink)]' : 'hover:text-white'}`}
          animationColor={'bg-[var(--pink)]'}
          text={'CAKES'}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          layout
          className="flex flex-wrap justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
          {activeSection === 'cookies'
            ? cookies.map((cookie, index) => (
                <div key={index} className={'overflow-hidden w-full md:w-1/2 lg:w-1/3 '}>
                  <motion.div className={'w-full'} variants={itemVariants}>
                    <BestsellerDisplay key={cookie.id} id={cookie.id} title={cookie.name?.toUpperCase()} price={cookie.price} />
                  </motion.div>
                </div>
              ))
            : cakes.map((cake, index) => (
                <div key={index} className={'overflow-hidden w-full md:w-1/2 lg:w-1/3 '}>
                  <motion.div className={'w-full'} variants={itemVariants}>
                    <BestsellerDisplay key={cake.id} id={cake.id} title={cake.name?.toUpperCase()} price={cake.price} />
                  </motion.div>
                </div>
              ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ProductsSection;
