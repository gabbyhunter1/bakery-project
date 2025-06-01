import React from 'react';
import Newsletter from '@/app/_components/newsletter/newsletter';

const NewsletterSection = () => {
  return (
    <>
      <section className="section-padding" style={{ borderRadius: '0 0 1.5rem 1.5rem' }}>
        <Newsletter />
      </section>
    </>
  );
};

export default NewsletterSection;
