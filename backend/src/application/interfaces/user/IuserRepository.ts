import { User } from "../../../entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  add(user: User): Promise<User>;
}