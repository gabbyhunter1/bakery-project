import React from 'react';
import CookiesSection from '@/app/_components/products-showcase/cookies-section';
import { ProductsResponse } from '@/types/product-types';

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
