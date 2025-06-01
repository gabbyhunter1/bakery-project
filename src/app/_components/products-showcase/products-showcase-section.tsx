import React from 'react';
import Button from '@/components/button';
import BestsellerDisplay from '@/app/_components/bestsellers/bestseller-display';
import CookiesSection from '@/app/_components/products-showcase/cookies-section';
import { Product, ProductsResponse } from '@/types/product-types';

const ProductsShowcaseSection = async () => {
  const data = await fetch(`${process.env.API_BASE_URL}/api/goods`);
  const products: ProductsResponse = await data.json();

  return (
    <section className="section-padding">
      <CookiesSection products={products} />
    </section>
  );
};

export default ProductsShowcaseSection;
