export interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }

  export interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    totalItems: number;
  }