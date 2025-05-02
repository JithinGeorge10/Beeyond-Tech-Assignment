'use client';
import { CartContextProps, CartItem } from '@/lib/types/cart';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Ensure that cart is initially empty and only populated from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        // Update localStorage whenever the cart state changes
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === item.id);
            if (existing) {
                // If item exists, increase quantity
                return prev.map(p =>
                    p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                // If item doesn't exist, add it to the cart
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
