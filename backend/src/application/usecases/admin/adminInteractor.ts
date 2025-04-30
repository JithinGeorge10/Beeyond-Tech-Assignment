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
      let admin = await this.repository.findByEmailandPassword(email,password);
console.log(admin);

      return admin;

    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

}