import { Admin } from "../../../entities/admin";

export interface IAdminInteractor {
 
    adminLogin(email: string, password: string): Promise<Admin | null>;

}