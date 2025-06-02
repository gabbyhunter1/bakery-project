'use client';

import React, { Fragment, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/app/contexts/cart-context';
import Button from '@/components/button';
import { animate, KeyframeOptions } from 'motion';
import { useInView } from 'motion/react';

const Modal = () => {
  const { items, updateQuantity, removeItem, calculateTotalPrice } = useCart();

  // const handleClearCart = () => {
  //   clearCart();
  // };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="flex">
      <div className="mt-6 flex flex-col justify-between flex-grow">
        <div data-lenis-prevent={''} className="flex flex-col gap-4 h-[68dvh] sm:h-[75dvh] overflow-y-auto">
          <AnimatePresence>
            {items.map(item => (
              <Fragment key={item.goodsId}>
                <motion.div className="mr-4 mb-8" initial={{ x: '0%' }} exit={{ x: '100%' }} transition={{ duration: 0.2 }}>
                  <div className="flex gap-4 items-start">
                    <div className="relative min-w-[125px] w-[25%] aspect-square">
                      <Image src={'/cookie.webp'} alt={'cookie.webp'} width={125} height={125} />
                    </div>
                    <div className="flex flex-col gap-1 justify-around w-full">
                      <p className="font-black text-xl leading-[.9]">{item.name}</p>
                      <p className="text-lg">{`$${item.price}`}</p>

                      <div className="mt-3 flex justify-between max-sm:flex-col">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateQuantity(item.goodsId, item.quantity - 1)}
                            className="relative w-8 text-4xl font-medium aspect-square flex justify-center items-center cursor-pointer bg-[#147c98] pb-1 rounded-[100px]">
                            <span className="leading-[.9] absolute left-1/2 top-1/2 pb-1" style={{ transform: 'translate(-50%, -50%)' }}>
                              -
                            </span>
                          </button>
                          <p className="w-16 flex justify-center items-center text-3xl font-bold">{item.quantity}</p>
                          <button
                            onClick={() => updateQuantity(item.goodsId, item.quantity + 1)}
                            className="relative w-8 text-4xl font-medium aspect-square flex justify-center items-center cursor-pointer bg-[var(--pink)] pb-1 rounded-[100px]">
                            <span
                              className="leading-[.9] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                              style={{ transform: 'translate(-50%, -50%)' }}>
                              +
                            </span>
                          </button>
                        </div>
                        <motion.button
                          onClick={() => handleRemoveItem(item.goodsId)}
                          className={'text-xl font-bold'}
                          initial={{ color: '#000000' }}
                          whileHover={{ color: '#ffa7ee', scale: 0.95 }}>
                          Remove
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Fragment>
            ))}
          </AnimatePresence>
        </div>

        <Button
          className={'w-full mb-10 py-5 px-4 border-[var(--pink)] !font-black bg-[var(--pink)]'}
          animationColor={'bg-[var(--background)]'}
          text={
            <>
              SEND ORDER &nbsp;•&nbsp; <AnimatedCounter from={0} to={totalPrice} />$
            </>
          }
        />
      </div>
    </div>
  );
};

type AnimatedCounterProps = {
  from: number;
  to: number;
  animationOptions?: KeyframeOptions;
};

function usePrevious<T>(value: T) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const AnimatedCounter = ({ from, to, animationOptions }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const prevTo = usePrevious(to);

  useEffect(() => {
    const element = ref.current;
    if (!element || !inView) return;

    const start = prevTo ?? from ?? 0;

    const controls = animate(start, to, {
      duration: 0.5,
      ease: 'easeOut',
      ...animationOptions,
      onUpdate(value) {
        element.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [to, inView, from, animationOptions, prevTo]);

  return <span ref={ref} />;
};

export default Modal;
