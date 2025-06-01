import React from 'react';
import Marquee from '@/app/_components/marquee';
import BestsellersMarquee from '@/app/_components/marquee';
import BestsellerDisplay from '@/app/_components/bestsellers/bestseller-display';
import { Product, ProductsResponse } from '@/types/product-types';

const Bestsellers = async () => {
  const data = await fetch(`${process.env.API_BASE_URL}/api/goods`);
  const products: ProductsResponse = await data.json();
  return (
    <section className="!pt-0 section-padding -mt-20 max-[1015px]:mt-[220px] overflow-hidden relative min-h-[135vh] flex items-center justify-center">
      <BestsellersMarquee />
      <div className="w-full z-[1] flex max-[1015px]:max-w-2xl max-[1015px]:flex-col max-[1015px]:gap-16 justify-between">
        {products.slice(0, 3).map((product: Product) => (
          <BestsellerDisplay
            key={product.id}
            id={product.id}
            title={product.name}
            description={'Box of 6 • 4oz'}
            price={product.price}
            style={'arch'}
          />
        ))}
      </div>
    </section>
  );
};

export default Bestsellers;
