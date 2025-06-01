import React from 'react';
import { OrdersResponse } from '@/types/product-types';
import Modal from '@/app/_components/navbar/modal';

const ModalWrapper = async () => {
  const data = await fetch(`${process.env.API_BASE_URL}/api/orders`);
  const orders: OrdersResponse = await data.json();

  return <Modal orders={orders} />;
};

export default ModalWrapper;
