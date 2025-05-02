'use client';
import { User, UserContextProps } from '@/lib/types/user';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Ensure that cart is initially empty and only populated from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('customerDetails');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    );
};

export const useCustomer = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
