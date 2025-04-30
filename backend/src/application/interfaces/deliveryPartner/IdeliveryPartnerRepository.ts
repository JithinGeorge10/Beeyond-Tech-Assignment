import { deliveryPartner } from "../../../entities/DeliveryPartner";

export interface IDeliveryPartnerRepository {
  findByEmail(email: string): Promise<deliveryPartner | null>;
  add(user: deliveryPartner): Promise<deliveryPartner>;
}