import React from 'react';
import Testimonial from '@/app/_components/testimonials/testimonial';

const TestimonialsSection = () => {
  const testimonialCount = 16;
  const testimonials = Array.from({ length: testimonialCount }, (_, i) => (i % 2 === 0 ? 'light' : 'dark'));

  return (
    <section className="mt-24 mb-[300px] overflow-hidden">
      <div className="w-max">
        <div className="flex gap-5 arches-animation">
          {testimonials.map((style, index) => (
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
