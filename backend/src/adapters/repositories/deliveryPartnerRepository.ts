import { IDeliveryPartnerRepository } from "../../application/interfaces/deliveryPartner/IdeliveryPartnerRepository";
import { deliveryPartner } from "../../entities/DeliveryPartner";
import { DeliveryPartner } from "../../infrastructure/db/models/deliveryPartnerModel";
import Order from "../../infrastructure/db/models/orderModel";
import TokenBlacklist from "../../infrastructure/db/models/tokenBlackList";
import { ErrorResponse } from "../../utils/errors";
import bcrypt from 'bcrypt';

export class DeliveryPartnerRepository implements IDeliveryPartnerRepository {

  find(filter: any, page: any): Promise<deliveryPartner[]> {
    throw new Error("Method not implemented.");
  }
  update(_id: string, user: any): Promise<deliveryPartner | null> {
    throw new Error("Method not implemented.");
  }
  upsert(user: deliveryPartner): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  filter(filter: any, page: any): Promise<deliveryPartner[]> {
    throw new Error("Method not implemented.");
  }
  count(filter: any): Promise<number> {
    throw new Error("Method not implemented.");
  }
  search(search: string): Promise<deliveryPartner[]> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<deliveryPartner | null> {
    try {
      const data = await DeliveryPartner.findOne({ email });
      return data;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  async add(deliverPartner: deliveryPartner): Promise<deliveryPartner> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(deliverPartner.password, saltRounds);
      deliverPartner.password = hashedPassword;
      const data = new DeliveryPartner(deliverPartner);
      await data.save();
      return data;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async findByBlackListToken(token: string): Promise<any> {
    try {
      const blacklistedToken = await TokenBlacklist.findOne({ token });

      if (blacklistedToken) {
        return { message: "Token is blacklisted" };
      }

      return null;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status || 500);
    }
  }

  async addTokenBlackList(token: string): Promise<any> {
    try {
      await TokenBlacklist.create({ token });
      return { message: "Logged out successfully" };
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async getOrders(): Promise<any> {
    try {
      console.log('repo reached');

      const orders = await Order.find({
        deliveryPartner: null
      }).sort({ createdAt: -1 });
      const simplifiedOrders = orders.map(order => ({
        id: order._id,
        createdAt: order.createdAt,
        status: order.status,
        items: order.items,
        address: order.address
      }));
      return simplifiedOrders;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status || 500);
    }
  }
  async acceptOrder(orderId: string, deliveryPartnerId: string): Promise<string> {
    try {
      console.log('repo reached');
      console.log('d' + deliveryPartnerId);

      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          status: 'ontheway',
          deliveryPartner: deliveryPartnerId,
        },
        { new: true }
      );

      if (!updatedOrder) {
        throw new ErrorResponse('Order not found', 404);
      }

      return updatedOrder.id;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status || 500);
    }
  }

  async getActiveOrders(userId: string): Promise<any> {
    try {
      console.log('repo reached');

      const orders = await Order.find({
        deliveryPartner: userId,
        status: 'ontheway'
      }).sort({ createdAt: -1 });


      const simplifiedOrders = orders.map(order => ({
        id: order._id,
        createdAt: order.createdAt,
        status: order.status,
        items: order.items,
        address: order.address
      }));
      return simplifiedOrders;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status || 500);
    }
  }

  async getDeliveredOrders(userId: string): Promise<any> {
    try {
      console.log('repo reached');

      const orders = await Order.find({
        deliveryPartner: userId,
        status: 'delivered'
      }).sort({ createdAt: -1 });


      const simplifiedOrders = orders.map(order => ({
        id: order._id,
        createdAt: order.createdAt,
        status: order.status,
        items: order.items,
        address: order.address
      }));
      return simplifiedOrders;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status || 500);
    }
  }

  async deliveredOrder(orderId: string): Promise<string> {
    try {
      console.log('repo reached');

      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          status: 'delivered',
        },
        { new: true }
      );

      if (!updatedOrder) {
        throw new ErrorResponse('Order not found', 404);
      }

      return updatedOrder.id;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status || 500);
    }
  }

}