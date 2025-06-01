export interface CartItem {
  goodsId: number;
  quantity: number;
  name: string;
  price: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (goodsId: number, quantity: number, name: string, price: number) => void;
  removeItem: (goodsId: number) => void;
  updateQuantity: (goodsId: number, quantity: number) => void;
  decreaseQuantity: (goodsId: number, quantity?: number) => void;
  calculateTotalPrice: () => number;
  clearCart: () => void;
  getTotalItems: () => number;
}
