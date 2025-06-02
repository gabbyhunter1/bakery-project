'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartContextType, CartItem } from '@/types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (goodsId: number, quantity: number, name?: string, price?: number) => {
    if (name === undefined || price === undefined) {
      console.warn('Cannot add item without name and price');
      return;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.goodsId === goodsId);
      if (existingItem) {
        return prevItems.map(item =>
          item.goodsId === goodsId
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }
      return [...prevItems, { goodsId, quantity, name, price }];
    });
  };

  const removeItem = (goodsId: number) => {
    setItems(prevItems => prevItems.filter(item => item.goodsId !== goodsId));
  };

  const updateQuantity = (goodsId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(goodsId);
      return;
    }
    setItems(prevItems => prevItems.map(item => (item.goodsId === goodsId ? { ...item, quantity } : item)));
  };

  const decreaseQuantity = (goodsId: number, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.goodsId === goodsId);
      if (!existingItem) return prevItems;

      const newQuantity = existingItem.quantity - quantity;

      if (newQuantity <= 0) {
        return prevItems.filter(item => item.goodsId !== goodsId);
      }

      return prevItems.map(item => (item.goodsId === goodsId ? { ...item, quantity: newQuantity } : item));
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    calculateTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
