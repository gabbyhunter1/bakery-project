'use client';

import React from 'react';

interface MarqueeRowProps {
  direction: 'left' | 'right';
  children: React.ReactNode;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ direction, children }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <div className={`marquee overflow-hidden inline-flex items-center ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
        {children}
      </div>
    </div>
  );
};

const BestsellersMarquee: React.FC = () => {
  return (
    <div className="absolute z-[1] w-[120%] -z-10 rotate-[-10deg] text-white">
      {/* Row 1 - Moving Left */}
      <MarqueeRow direction="left">
        <div>BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div>BESTSELLERS</div>
      </MarqueeRow>

      {/* Row 2 - Moving Right */}
      <MarqueeRow direction="right">
        <div>BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div>BESTSELLERS</div>
      </MarqueeRow>

      {/* Row 3 - Moving Left */}
      <MarqueeRow direction="left">
        <div className="shadowed">BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div>BESTSELLERS</div>
      </MarqueeRow>

      {/* Row 4 - Moving Right */}
      <MarqueeRow direction="right">
        <div>BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div>BESTSELLERS</div>
        <div className="shadowed">BESTSELLERS</div>
        <div>BESTSELLERS</div>
      </MarqueeRow>
    </div>
  );
};

export default BestsellersMarquee;
