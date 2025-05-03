import { deliveryPartner } from "../../../entities/DeliveryPartner";

export interface IDeliveryPartnerRepository {
  addTokenBlackList(token: string): unknown;
  findByEmail(email: string): Promise<deliveryPartner | null>;
  add(user: deliveryPartner): Promise<deliveryPartner>;
  getOrders(): Promise<any>;
  findByBlackListToken(token:string): Promise<any>;

}