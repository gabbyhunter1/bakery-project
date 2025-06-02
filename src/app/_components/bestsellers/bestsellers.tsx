import React from 'react';
import BestsellersMarquee from '@/app/_components/marquee';
import BestsellerDisplay from '@/app/_components/bestsellers/bestseller-display';
import { Product } from '@/types/product-types';

const Bestsellers = async () => {
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

const products: Product[] = [
  {
    id: 1,
    name: 'Birthday',
    price: 29,
    mount: 10,
  },
  {
    id: 2,
    name: 'Chocolate Chunk',
    price: 29,
    mount: 10,
  },
  {
    id: 3,
    name: 'Saint Moris',
    price: 29,
    mount: 10,
  },
  {
    id: 4,
    name: 'Double Dark Chunk',
    price: 29,
    mount: 10,
  },
  {
    id: 6,
    name: 'Caramel',
    price: 29,
    mount: 10,
  },
  {
    id: 7,
    name: 'Judy Cookie',
    price: 29,
    mount: 10,
  },
  {
    id: 8,
    name: 'Rainbow Birthday Cake',
    price: 60,
    mount: 10,
  },
  {
    id: 9,
    name: 'Full Frosting Rainbow Birthday Cake',
    price: 65,
    mount: 10,
  },
  {
    id: 10,
    name: 'Chocolate Ganache Cake',
    price: 65,
    mount: 10,
  },
  {
    id: 11,
    name: 'Lemon-Raspberry Cream Cake',
    price: 75,
    mount: 10,
  },
  {
    id: 12,
    name: 'Celebration Cake',
    price: 150,
    mount: 10,
  },
  {
    id: 13,
    name: 'Strawberry Shortcake',
    price: 190,
    mount: 10,
  },
  {
    id: 14,
    name: 'Rainbow Birthday Cake',
    price: 190,
    mount: 10,
  },
];

export default Bestsellers;
