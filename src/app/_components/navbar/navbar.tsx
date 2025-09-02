'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

const Navbar = ({ children }: { children: ReactNode }) => {
  const [isHeroVisible, setIsHeroVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of hero is visible
        rootMargin: '-50px 0px 0px 0px', // Offset to trigger slightly before hero completely leaves
      }
    );

    const heroElement = document.getElementById('hero-section');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  }, []);

  const logoText = 'BRAND';
  const navItems = ['COOKIES', 'CAKES', 'ABOUT', 'CONTACT', 'FRANÇAIS'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-[4vw] py-[30px]">
      {/* Sliding White Background */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ y: '-100%' }}
        animate={{ y: isHeroVisible || isHeroVisible === null ? '-100%' : 0 }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 100,
        }}
      />

      <div className="relative flex items-center justify-between">
        {/* Staggered Logo with Sliding Effect */}
        <Link href={'/'} className="font-bold text-5xl overflow-hidden relative">
          {/* White Logo (slides down and hides) */}
          <motion.div
            className="absolute text-white"
            animate={{
              y: isHeroVisible ? 0 : '100%',
            }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}>
            {logoText}
          </motion.div>

          {/* Black Logo (slides from up to down) */}
          <motion.div
            className="text-black"
            initial={{ y: '-100%' }}
            animate={{
              y: isHeroVisible ? '-100%' : 0,
            }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}>
            {logoText}
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-16 font-bold text-xl">
          <div className="flex gap-16 max-lg:hidden">
            {navItems.map(item => (
              <motion.a
                key={item}
                href="#"
                initial={{ color: '#ffffff' }}
                whileHover={{ color: '#ffa7ee', scale: 0.95 }}
                animate={{
                  color: isHeroVisible ? '#ffffff' : '#000000',
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}>
                {item}
              </motion.a>
            ))}
          </div>
          <motion.div
            initial={{ color: '#ffffff' }}
            animate={{
              color: isHeroVisible ? '#ffffff' : '#000000',
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
            className="flex gap-5">
            {children}
            <svg className="text-black w-6 h-6" role="presentation" viewBox="0 0 18 17">
              <g transform="translate(1 1)" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square">
                <path d="M16 16l-5.0752-5.0752"></path>
                <circle cx="6.4" cy="6.4" r="6.4"></circle>
              </g>
            </svg>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
