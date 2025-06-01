import React from 'react';
import Testimonial from '@/app/_components/testimonials/testimonial';

const TestimonialsSection = () => {
  return (
    <section className="mt-24 mb-[300px] overflow-hidden">
      <div className="w-max">
        <div className="flex gap-5 arches-animation">
          {[
            'light',
            'dark',
            'light',
            'dark',
            'light',
            'dark',
            'light',
            'dark',
            'light',
            'dark',
            'light',
            'dark',
            'light',
            'dark',
            'light',
            'dark',
          ].map((style, index) => (
            <div key={index}>
              <Testimonial style={style} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
