'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/app/contexts/cart-context';

const Cart = ({ children }: { children?: ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { getTotalItems } = useCart();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (showCart) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-lenis-prevent', '');

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowCart(false);
        }
      };

      const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          setShowCart(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.removeAttribute('data-lenis-prevent');
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showCart]);

  const handleClick = () => {
    setShowCart(prev => !prev);
  };

  if (!hasMounted) return null;

  return (
    <>
      <div className="relative">
        <motion.svg
          whileHover={{ scale: 0.95 }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
          className="w-6 h-6 cursor-pointer hover:text-[var(--pink)]"
          onClick={handleClick}
          role="presentation"
          viewBox="0 0 17 20">
          <path
            d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z"
            fill="currentColor"></path>
        </motion.svg>
        {getTotalItems() !== 0 && <span className="w-2 h-2 absolute top-[10%] right-0 bg-black rounded-full"></span>}
      </div>
      {createPortal(
        <>
          <AnimatePresence>
            {showCart && (
              <>
                <motion.div
                  className="fixed z-[998] inset-0 bg-black bg-opacity-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}></motion.div>
                <motion.div
                  ref={modalRef}
                  className="fixed top-0 right-0 h-full max-w-[550px] w-full bg-white z-[999] p-8"
                  initial={{ x: '100%' }}
                  animate={{ x: '0%' }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.4 }}>
                  <div className="flex justify-between pb-5" style={{ borderBottom: '2px solid var(--blue)' }}>
                    <h2 className="font-black text-3xl">CART • {getTotalItems()}</h2>
                    <button onClick={handleClick} className="text-2xl hover:text-[var(--pink)]">
                      X
                    </button>
                  </div>
                  {children}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </>
  );
};

export default Cart;
