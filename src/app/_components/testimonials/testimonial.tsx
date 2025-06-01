import React from 'react';
import Image from 'next/image';

const Testimonial = ({ style = 'light' }: { style?: 'light' | 'dark' }) => {
  return (
    <div className={`${style === 'light' ? `bg-[var(--blue)]` : `bg-[var(--dark)]`} p-12 w-[520px] mr-[4vw] rounded-[3rem] text-[var(--background)]`}>
      <h3 className="leading-[.6] text-[5rem] font-bold">‘’</h3>
      <p className="mb-4">
        Bernice puts forth the kind of sweets that take you back to childhood. Nothing too complex, but everything is well done. The tiered cakes are
        nicely displayed on the counter, enjoy a single serving or an entire cakes.
      </p>
      <div className="relative w-[210px] h-[100px]">
        <Image src={'/testimonialLogoTest.avif'} fill alt={'1'} />
      </div>
    </div>
  );
};

export default Testimonial;
