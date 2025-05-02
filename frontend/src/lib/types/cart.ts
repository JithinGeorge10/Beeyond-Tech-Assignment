export interface CartItem {
    image: string | Blob | undefined;
    unitPrice: number;
    qty: number;
    id: number; // or string — but be consistent everywhere
    title: string;
    price: number;
    quantity: number;
  }

  export interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    totalItems: number;
    clearCart: () => void; 
    updateQuantity: (id: number, change: number) => void;
    removeFromCart: (id: number) => void;
}