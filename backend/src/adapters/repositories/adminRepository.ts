import { config } from "../../infrastructure/config/config";
import { IAdminRepository } from "../../application/interfaces/admin/IadminRepository";
import { Admin } from "../../entities/admin";
import { ErrorResponse } from "../../utils/errors";
import Order from "../../infrastructure/db/models/orderModel";
import TokenBlacklist from "../../infrastructure/db/models/tokenBlackList";
import { DeliveryPartner } from "../../infrastructure/db/models/deliveryPartnerModel";

export class AdminRepository implements IAdminRepository {
  async findByEmailandPassword(email: string, password: string): Promise<Admin | null> {
    try {
      if (email === config.EMAIL && password === config.PASSWORD) {
        return {
          id: 'admin123',
          email: config.EMAIL,
        } as unknown as Admin;
      }
      return null;
    } catch (error) {
      throw new Error("Method not implemented.");
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

      const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('deliveryPartner', 'fullName'); 
      const simplifiedOrders = orders.map(order => ({
        orderId: order._id,
        date: order.createdAt,
        itemCount: order.items.length,
        total: order.total,
        status: order.status,
        deliveryPartner: order.deliveryPartner?.fullName || 'Not assigned',
        address:order.address
      }));
      return simplifiedOrders;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status || 500);
    }
  }

  
  async getDeliveryPartners(): Promise<any> {
    try {
      console.log('repo reached');

      const deliveryPartners = await DeliveryPartner.find()
      .sort({ createdAt: -1 })

      const simplifieddeliveryPartners = deliveryPartners.map(value => ({
        fullName: value.fullName,
        date: value.createdAt,
        email: value.email,
        phoneNumber: value.phoneNumber,
      }));
      return simplifieddeliveryPartners;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status || 500);
    }
  }

}

