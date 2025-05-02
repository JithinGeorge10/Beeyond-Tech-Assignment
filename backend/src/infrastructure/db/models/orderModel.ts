// models/Order.ts
import mongoose, { Schema, model, models } from 'mongoose';
import { OrderDocument } from '../../../application/types/order';

const orderSchema = new Schema<OrderDocument>(
  {
    items: [
      {
        productName: String,
        price: String,
        quantity: Number,
      },
    ],
    total: Number,
    address: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Order = models.Order || model<OrderDocument>('Order', orderSchema);

export default Order;
