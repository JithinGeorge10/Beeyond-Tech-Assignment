import { deliveryPartner } from "../../../entities/DeliveryPartner";

export interface IDeliveryPartnerInteractor {
 
  signup(deliverPartner: deliveryPartner): Promise<deliveryPartner>;
  login(email: string, password: string): Promise<deliveryPartner | null>;
  blackListedToken(token:String): Promise<any | null>;
  getOrders(): Promise<any | null>;

}