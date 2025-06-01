'use client';

import React from 'react';
import Image from 'next/image';

const Arch = ({ fullHeight = true }: { fullHeight?: boolean }) => {
  return (
    <div
      className={`${fullHeight ? 'max-md:h-[50vw] h-[25vw]' : 'max-md:h-[45vw] h-[20vw]'} max-md:w-[40vw] w-[20vw] overflow-hidden arch-borders relative bg-black`}>
      <Image src={'/cake-test.webp'} className="" fill alt="cake" />
    </div>
  );
};

export default Arch;
