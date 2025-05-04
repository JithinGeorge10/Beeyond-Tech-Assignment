import { Admin } from "../../../entities/admin";
import { ErrorResponse } from "../../../utils/errors";
import { IAdminInteractor } from "../../interfaces/admin/IadminInteractor";
import { IAdminRepository } from "../../interfaces/admin/IadminRepository";

export class AdminInteractor implements IAdminInteractor {
  private repository: IAdminRepository;
  constructor(repository: IAdminRepository) {
    this.repository = repository;
  }

  login(email: string, password: string): Promise<Admin | null> {
    throw new Error("Method not implemented.");
  }



  async adminLogin(email: string, password: string): Promise<Admin | null> {
    try {
     
  
      let admin = await this.repository.findByEmailandPassword(email, password);
      console.log(admin);

      return admin;

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
  
  async getDeliveryPartners(): Promise<any | null> {
    try {
      const orderData = await this.repository.getDeliveryPartners();
      return orderData
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  async addBlackListedToken(token: string): Promise<any | null> {
    try {

    
      let user = await this.repository.addTokenBlackList(token);
      return user

    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

}