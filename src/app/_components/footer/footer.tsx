import React from 'react';

const Footer = () => {
  const footerHeight = 650;

  return (
    <div className={`relative -z-10`} style={{ height: `${footerHeight}px` }}>
      <div
        className={`bg-[var(--blue)] relative h-[calc(100vh+${footerHeight}px)] -top-[100vh]`}
        style={{ height: `calc(100vh + ${footerHeight}px)` }}>
        <div
          className={`h-[${footerHeight}px] sticky top-[calc(100vh-600px)]`}
          style={{ height: `${footerHeight}px`, top: `calc(100vh - ${footerHeight}px)` }}>
          <div className="flex items-end w-full justify-center h-full">
            <p className="text-[23vw] text-white font-black">BERNICE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
