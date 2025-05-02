import { Document, Types } from 'mongoose';

export interface OrderItem {
  productName: string;
  price: string;
  quantity: number;
}

export interface OrderDocument extends Document {
  _id: Types.ObjectId; // ✅ explicitly define _id type
  items: OrderItem[];
  total: number;
  address: string;
  userId: Types.ObjectId;
}
