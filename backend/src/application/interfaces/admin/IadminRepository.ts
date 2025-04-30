import { Admin } from "../../../entities/admin";

export interface IAdminRepository {
  findByEmailandPassword(email: string, password: string): Promise<Admin | null>;
}