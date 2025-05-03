import { deliveryPartner } from "../../../entities/DeliveryPartner";
import { ErrorResponse } from "../../../utils/errors";
import { IDeliveryPartnerRepository } from "../../interfaces/deliveryPartner/IdeliveryPartnerRepository";
import { IDeliveryPartnerInteractor } from "../../interfaces/deliveryPartner/IdeliveryPartnerInteractor";
import {
  comparePassword,
  generateHashPassword,
} from "../../../infrastructure/middlewares/hashPasswordMiddleware";
export class DeliveryPartnerInteractor implements IDeliveryPartnerInteractor {
  private repository: IDeliveryPartnerRepository;

  constructor(repository: IDeliveryPartnerRepository) {
    this.repository = repository;

  }

  async signup(user: deliveryPartner): Promise<deliveryPartner> {
    try {
      const userExist = await this.repository.findByEmail(user.email);

      if (userExist) {
        throw new ErrorResponse("user aldready registered", 400);
      }

      const newUser = await this.repository.add(user);

      return newUser;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  async login(email: string, password: string): Promise<deliveryPartner | null> {
    try {
      let user = await this.repository.findByEmail(email);

      if (!user || !user.password) {
        throw new ErrorResponse("user dosen't exist", 404);
      }

      const passwordMatch = await comparePassword(password, user.password);

      if (!passwordMatch) {
        throw new ErrorResponse("password dosen't match", 400);
      }

      return user;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async blackListedToken(token: string): Promise<any | null> {
    try {
      console.log(token);
      const tokenExist = await this.repository.findByBlackListToken(token);

      if (tokenExist) {
        throw new ErrorResponse("blackListedToken", 400);
      }

      return 'token verified'

    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  

  async getOrders(): Promise<any | null> {
    try {
      const orderData = await this.repository.getOrders();
      return orderData
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  
  async acceptOrders(orderId:string,deliveryPartnerId:string): Promise<any | null> {
    try {
      const orderData = await this.repository.acceptOrder(orderId,deliveryPartnerId);
      return orderData
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  
  async getActiveOrders(userId:string): Promise<any | null> {
    try {
      const orderData = await this.repository.getActiveOrders(userId);
      return orderData
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }

  }

  async getDeliveredOrders(userId:string): Promise<any | null> {
    try {
      const orderData = await this.repository.getDeliveredOrders(userId);
      return orderData
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }

  }
  async deliveredOrders(orderId:string): Promise<any | null> {
    try {
      const orderData = await this.repository.deliveredOrder(orderId);
      return orderData
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
}