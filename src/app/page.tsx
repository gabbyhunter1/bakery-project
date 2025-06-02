import HeroSection from '@/app/_components/hero-section';
import DescriptionSection from '@/app/_components/description-section';
import Navbar from '@/app/_components/navbar/navbar';
import Bestsellers from '@/app/_components/bestsellers/bestsellers';
import ArchesDisplay from '@/app/_components/arches-display/arches-display';
import AnimatedPath from '@/components/animated-path';
import TestimonialsSection from '@/app/_components/testimonials/testimonials-section';
import CtaSection from '@/app/_components/cta/cta-section';
import NewsletterSection from '@/app/_components/newsletter/newsletter-section';
import Footer from '@/app/_components/footer/footer';
import ProductsShowcaseSection from '@/app/_components/products-showcase/products-showcase-section';
import ModalWrapper from '@/app/_components/navbar/modal/modal-wrapper';
import CartModal from '@/app/_components/navbar/modal/cart-modal';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <>
      <main className="bg-[var(--background)]" style={{ borderRadius: '0 0 1.5rem 1.5rem' }}>
        <Navbar>
          <CartModal>
            <ModalWrapper />
          </CartModal>
        </Navbar>
        <AnimatedPath />
        <HeroSection />
        <DescriptionSection
          heading={'GOOD FOOD SHOULD BOTH COMFORT AND NOURISH THE SOUL.'}
          description={
            'We are centrally located in the neighborhood of St-Henri. Stop by for a coffee, catch up on work, or grab some of our delicious goodies to go.\n' +
            '        With cookies and cakes available for online order, there’s something for everyone, and every occasion.'
          }
        />
        <Bestsellers />
        <ArchesDisplay />
        <ProductsShowcaseSection />
        <TestimonialsSection />
        <CtaSection />
        <NewsletterSection />
        {/*<Spacefiller />*/}
      </main>
      <footer className="">
        <Footer />
      </footer>
      <ToastContainer />
    </>
  );
}
