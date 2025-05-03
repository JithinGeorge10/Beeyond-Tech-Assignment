import { Admin } from "../../../entities/admin";

export interface IAdminRepository {
  findByEmailandPassword(email: string, password: string): Promise<Admin | null>;
  getOrders(): Promise<any>;
  findByBlackListToken(token:string): Promise<any>;
  getDeliveryPartners(): Promise<any>;
  addTokenBlackList(token: string): unknown;

  

}