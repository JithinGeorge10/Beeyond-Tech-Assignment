import { Admin } from "../../../entities/admin";

export interface IAdminInteractor {
 
    adminLogin(email: string, password: string): Promise<Admin | null>;
    blackListedToken(token:String): Promise<any | null>;
    getOrders(): Promise<any | null>;
    getDeliveryPartners(): Promise<any | null>;
    addBlackListedToken(token:String): Promise<any | null>;

    
}