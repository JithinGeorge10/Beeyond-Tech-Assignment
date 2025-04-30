import { IDeliveryPartnerRepository } from "../../application/interfaces/deliveryPartner/IdeliveryPartnerRepository";
import { deliveryPartner } from "../../entities/DeliveryPartner";
import { DeliveryPartner } from "../../infrastructure/db/models/deliveryPartnerModel";
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
   
}