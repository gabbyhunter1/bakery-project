import type { operations } from '@/types/api';

export type ProductsResponse = operations['getAllGoods']['responses'][200]['content']['*/*'];
export type Product = {
  id: number;
  name: string;
  price: number;
  mount: number;
};
// export type Product = components['schemas']['GoodsDto'];

export type OrdersResponse = operations['getAllOrders']['responses'][200]['content']['*/*'];
