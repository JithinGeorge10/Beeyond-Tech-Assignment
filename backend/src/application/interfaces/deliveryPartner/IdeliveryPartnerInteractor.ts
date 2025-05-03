import { deliveryPartner } from "../../../entities/DeliveryPartner";

export interface IDeliveryPartnerInteractor {
 
  signup(deliverPartner: deliveryPartner): Promise<deliveryPartner>;
  login(email: string, password: string): Promise<deliveryPartner | null>;
  blackListedToken(token:String): Promise<any | null>;
  getOrders(): Promise<any | null>;
  acceptOrders(orderId:string,deliveryPartnerId:string): Promise<any | null>;
  getActiveOrders(user:string): Promise<any | null>;
  deliveredOrders(orderId:string): Promise<any | null>;
  getDeliveredOrders(user:string): Promise<any | null>;

  
  
}