import { Document, Types } from 'mongoose';

export interface OrderItem {
  productName: string;
  price: string;
  quantity: number;
}
export interface OrderDocument {
  _id: any;
  items: {
    productName: string;
    price: string;
    quantity: number;
  }[];
  total: number;
  address: string;
  userId: Types.ObjectId;
  status: 'pickup' | 'ontheway' | 'delivered';
  deliveryPartner?: Types.ObjectId; // this line is the key fix
  createdAt?: Date;
  updatedAt?: Date;
}
