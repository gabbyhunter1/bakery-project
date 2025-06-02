'use client';

import React, { useRef, useState } from 'react';
import CurvedText from '@/app/_components/cta/curved-text';
import Image from 'next/image';
import { motion } from 'motion/react';

const CtaSection = () => {
  const orderRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: '0px', y: '0px' });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = orderRef.current?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect?.left;
      const y = event.clientY - rect.top;
      setCoords({ x: `${x}px`, y: `${y}px` });
    }
  };

  return (
    <section className="section-padding flex flex-col justify-center items-center">
      <div style={{ aspectRatio: 0.75 }} className="relative min-w-[260px] w-[30vw] mb-24">
        <div style={{ borderRadius: '500px 500px 5rem 5rem' }} className="relative z-10 w-full h-full">
          <div style={{ transform: 'translate(-50%, -60%)' }} className="absolute top-1/2 left-1/2 h-full min-w-[260px] w-[33vw]">
            <Image style={{ borderRadius: '500px 500px 5rem 5rem', width: '100%' }} src={'/CTA-cake.webp'} width={500} height={625} alt={'1'} />
            <motion.div
              ref={orderRef}
              onMouseMove={handleMouseMove}
              className="absolute z-10 rounded-full ring-8 ring-[var(--background)] overflow-hidden left-1/2 bottom-[-20%] border-[6px] border-[var(--pink)] mt-4 font-medium bg-[var(--pink)] flex justify-center items-center leading-[.9]"
              style={
                {
                  '--mouse-x': coords.x,
                  '--mouse-y': coords.y,
                  translateX: '-50%',
                } as React.CSSProperties
              }
              whileHover="hover"
              initial="rest"
              animate="rest">
              <motion.div
                className="bestseller-animated-button bg-white"
                variants={{
                  rest: { scale: 0, x: '-50%', y: '-50%' },
                  hover: { scale: 1, x: '-50%', y: '-50%' },
                }}
              />
              <motion.button
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 0.9 },
                }}
                className="relative text-[var(--background)]  rounded-[1000px] hover:text-black aspect-square text-3xl md:text-5xl lg:text p-8 z-10">
                ORDER
              </motion.button>
            </motion.div>
          </div>
        </div>

        <CurvedText />
      </div>

      <div className="max-sm:w-full w-[40%] text-center">
        <p className="max-sm:mt-0 my-4">
          Ordering a cake at Bernice Bakery is a seamless and personalized experience. Customers can either visit the bakery in person, over the phone
          or more conveniently, place an order online.
        </p>
        <p>
          The process begins with selecting from our seasonal variety of cake flavors and then choosing your selected day and time for pickup. Keep in
          mind that our cakes are baked to order, and we require at least 24-hour advance notice. Our cake will most certainly be the delicious ending
          to any of your celebrations!
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
