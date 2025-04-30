import { User } from "../../../entities/User";

export interface IUserRepository {
  find(filter: any, page: any): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  add(user: User): Promise<User>;
}