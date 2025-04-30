
export type UserRole = 'customer' | 'delivery' | 'admin';

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  estimatedDeliveryTime?: string;
  statusHistory: StatusUpdate[];
};

export type StatusUpdate = {
  status: OrderStatus;
  timestamp: string;
  note?: string;
};
