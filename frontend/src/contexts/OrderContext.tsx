
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, StatusUpdate } from '../types';
import { useAuth } from './AuthContext';
import { useToast } from "@/components/ui/use-toast";

interface OrderContextType {
  orders: Order[];
  userOrders: Order[];
  availableOrders: Order[];
  createOrder: (order: Partial<Order>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => Promise<void>;
  assignOrderToDeliveryPartner: (orderId: string, partnerId: string, partnerName: string) => Promise<void>;
  loading: boolean;
}

// Mock orders
const MOCK_ORDERS: Order[] = [
  {
    id: 'order-1',
    customerId: '1',
    customerName: 'John Customer',
    customerAddress: '123 Customer St, City',
    customerPhone: '555-123-4567',
    items: [
      { 
        product: {
          id: 'prod-1',
          name: 'Burger Deluxe',
          description: 'A delicious burger with all the fixings',
          price: 9.99,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500',
          category: 'Food'
        }, 
        quantity: 2 
      },
      { 
        product: {
          id: 'prod-2',
          name: 'French Fries',
          description: 'Crispy golden french fries',
          price: 3.99,
          image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500',
          category: 'Food'
        }, 
        quantity: 1 
      }
    ],
    subtotal: 23.97,
    deliveryFee: 2.99,
    total: 26.96,
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 3900000).toISOString() },
      { status: 'confirmed', timestamp: new Date(Date.now() - 3600000).toISOString() }
    ]
  },
  {
    id: 'order-2',
    customerId: '1',
    customerName: 'John Customer',
    customerAddress: '123 Customer St, City',
    customerPhone: '555-123-4567',
    items: [
      { 
        product: {
          id: 'prod-3',
          name: 'Vegetable Pizza',
          description: 'Fresh vegetables on a crispy crust',
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500',
          category: 'Food'
        }, 
        quantity: 1 
      }
    ],
    subtotal: 12.99,
    deliveryFee: 2.99,
    total: 15.98,
    status: 'ready_for_pickup',
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 7500000).toISOString() },
      { status: 'confirmed', timestamp: new Date(Date.now() - 7200000).toISOString() },
      { status: 'preparing', timestamp: new Date(Date.now() - 6000000).toISOString() },
      { status: 'ready_for_pickup', timestamp: new Date(Date.now() - 5400000).toISOString() }
    ]
  }
];

const OrderContext = createContext<OrderContextType>({} as OrderContextType);

export const useOrders = () => useContext(OrderContext);

export const OrderProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const userOrders = currentUser?.role === 'customer'
    ? orders.filter(order => order.customerId === currentUser.id)
    : currentUser?.role === 'delivery'
    ? orders.filter(order => order.deliveryPartnerId === currentUser.id)
    : orders;
  
  const availableOrders = orders.filter(
    order => ['confirmed', 'preparing', 'ready_for_pickup'].includes(order.status) && !order.deliveryPartnerId
  );

  const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        customerId: currentUser?.id || '',
        customerName: currentUser?.name || orderData.customerName || '',
        customerAddress: orderData.customerAddress || currentUser?.address || '',
        customerPhone: orderData.customerPhone || currentUser?.phone || '',
        items: orderData.items || [],
        subtotal: orderData.subtotal || 0,
        deliveryFee: orderData.deliveryFee || 2.99,
        total: orderData.total || 0,
        status: 'pending',
        createdAt: new Date().toISOString(),
        statusHistory: [
          { status: 'pending', timestamp: new Date().toISOString() }
        ]
      };
      
      setOrders(prev => [...prev, newOrder]);
      
      // Automatically confirm the order after a short delay (for demo purposes)
      setTimeout(() => {
        updateOrderStatus(newOrder.id, 'confirmed');
        toast({
          title: "Order confirmed",
          description: "Your order has been confirmed and is being prepared",
        });
      }, 5000);
      
      return newOrder;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus, note?: string) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      setOrders(prev => prev.map(order => {
        if (order.id === orderId) {
          const statusUpdate = {
            status,
            timestamp: new Date().toISOString(),
            note
          };
          
          return {
            ...order,
            status,
            statusHistory: [...order.statusHistory, statusUpdate]
          };
        }
        return order;
      }));
      
      toast({
        title: "Status updated",
        description: `Order status changed to ${status.replace('_', ' ')}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const assignOrderToDeliveryPartner = async (orderId: string, partnerId: string, partnerName: string) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call with locking mechanism
      setOrders(prev => prev.map(order => {
        if (order.id === orderId && !order.deliveryPartnerId) {
          return {
            ...order,
            deliveryPartnerId: partnerId,
            deliveryPartnerName: partnerName,
            estimatedDeliveryTime: new Date(Date.now() + 30 * 60000).toISOString() // 30 mins from now
          };
        }
        return order;
      }));
      
      toast({
        title: "Order assigned",
        description: `Order assigned to ${partnerName}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    orders,
    userOrders,
    availableOrders,
    createOrder,
    updateOrderStatus,
    assignOrderToDeliveryPartner,
    loading
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
