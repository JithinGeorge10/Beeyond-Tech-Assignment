import { config } from "../../infrastructure/config/config";
import { IAdminRepository } from "../../application/interfaces/admin/IadminRepository";
import { Admin } from "../../entities/admin";


export class AdminRepository implements IAdminRepository {
    async findByEmailandPassword(email: string, password: string): Promise<Admin | null> {
        try {
          if (email === config.EMAIL && password === config.PASSWORD) {
            return {
              email: config.EMAIL,
            } as Admin; 
          }
          return null; 
        } catch (error) {
          throw new Error("Method not implemented.");   
        }
      }

  }