
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (user: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Mock users for demonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'customer@example.com',
    name: 'John Customer',
    role: 'customer',
    phone: '555-123-4567',
    address: '123 Customer St, City'
  },
  {
    id: '2',
    email: 'delivery@example.com',
    name: 'Dave Delivery',
    role: 'delivery',
    phone: '555-234-5678'
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Alice Admin',
    role: 'admin'
  }
];

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      const user = MOCK_USERS.find(u => u.email === email && u.role === role);
      
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        throw new Error('Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>, password: string) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email || '',
        name: userData.name || '',
        role: userData.role || 'customer',
        phone: userData.phone,
        address: userData.address
      };
      
      // Save user
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      // Add to mock users array (just for demo)
      MOCK_USERS.push(newUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    userRole: currentUser?.role || null,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
