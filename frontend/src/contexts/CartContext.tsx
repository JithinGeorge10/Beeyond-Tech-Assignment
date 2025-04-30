
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { useToast } from "@/components/ui/use-toast";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  // Load cart from local storage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);
  
  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((currentItems) => {
      // Check if product already exists in cart
      const existingItemIndex = currentItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const newItems = [...currentItems];
        newItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased to ${newItems[existingItemIndex].quantity}`,
        });
        
        return newItems;
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        
        return [...currentItems, { product, quantity }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems((currentItems) => {
      const itemToRemove = currentItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.product.name} removed from your cart`,
        });
      }
      
      return currentItems.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const deliveryFee = items.length > 0 ? 2.99 : 0;
  const total = subtotal + deliveryFee;

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
