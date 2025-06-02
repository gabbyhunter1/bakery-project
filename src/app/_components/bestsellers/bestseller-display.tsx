'use client';

import Image from 'next/image';
import Button from '@/components/button';
import { useCart } from '@/app/contexts/cart-context';
import { useState } from 'react';
import { Slide, toast } from 'react-toastify';

const BestsellerDisplay = ({
  style = 'default',
  id,
  title,
  description = '',
  price,
}: {
  style?: 'default' | 'arch';
  id: number | undefined;
  title: string | undefined;
  description?: string | undefined;
  price: number | undefined;
}) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  if (id === undefined) {
    return null;
  }

  const handleAddToCart = (quantity: number) => {
    if (quantity == 0) {
      toast.error('You forgot to specify the quantity', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
      return;
    }

    addItem(id, quantity, title, price);
    toast.success(`${title} has been added to the cart`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Slide,
    });
  };

  return (
    <div
      className={`relative basis-[30%] p-6 2xl:p-16 ${style === 'arch' ? '[border-radius:500px_500px_5rem_5rem] border-[4px] border-[var(--blue)]' : ''}  bg-[var(--background)]`}>
      <div className="relative w-full aspect-square mb-8">
        <Image src={'/cookie.webp'} alt={'cookie'} fill />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-black leading-[.9]">{title?.toUpperCase()}</h3>
        <p>{description}</p>
      </div>

      <div className="mt-1">
        <div className="flex justify-between items-center">
          <p className="font-medium text-xl">{`${price}$`}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                if (quantity === 0) {
                  return;
                }
                setQuantity(quantity - 1);
              }}
              className="w-12 text-4xl font-medium aspect-square flex justify-center items-center cursor-pointer bg-[#147c98] pb-1 rounded-[100px]">
              -
            </button>
            <p className="w-16 flex justify-center items-center text-3xl font-bold">{quantity}</p>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 text-4xl font-medium aspect-square flex justify-center items-center cursor-pointer bg-[var(--pink)] pb-1 rounded-[100px]">
              +
            </button>
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          handleAddToCart(quantity);
        }}
        className={'w-full py-5 px-4 border-[var(--pink)] bg-[var(--pink)]'}
        animationColor={'bg-[var(--background)]'}
        text={'ADD TO CART'}
      />
    </div>
  );
};

export default BestsellerDisplay;
