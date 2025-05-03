import { deliveryPartner } from "../../../entities/DeliveryPartner";

export interface IDeliveryPartnerRepository {
  addTokenBlackList(token: string): unknown;
  findByEmail(email: string): Promise<deliveryPartner | null>;
  add(user: deliveryPartner): Promise<deliveryPartner>;
  getOrders(): Promise<any>;
  findByBlackListToken(token:string): Promise<any>;
  acceptOrder(orderId:string,deliveryPartnerId:string): Promise<any>;
  getActiveOrders(userId:string): Promise<any>;
  getDeliveredOrders(userId:string): Promise<any>;  
  deliveredOrder(orderId:string): Promise<any | null>;

  
}