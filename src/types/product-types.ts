import type { operations, components } from '@/types/api';

export type ProductsResponse = operations['getAllGoods']['responses'][200]['content']['*/*'];
export type Product = components['schemas']['GoodsDto'];

export type OrdersResponse = operations['getAllOrders']['responses'][200]['content']['*/*'];
