// models/Order.ts
import  { Schema, model, models } from 'mongoose';
import { OrderDocument } from '../../../application/types/order';

const orderSchema = new Schema<OrderDocument>(
  {
    items: [
      {
        productId: String,
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
    status: {
      type: String,
      enum: ['pickup', 'ontheway', 'delivered'],
      default: 'pickup',
    },
    deliveryPartner: {
      type: Schema.Types.ObjectId,
      required:false,
      ref: 'DeliveryPartner',
    },
  },
  { timestamps: true }
);

const Order = models.Order || model<OrderDocument>('Order', orderSchema);

export default Order;
