import { User } from "../../../entities/User";

export interface IUserInteractor {
 
  signup(user: User): Promise<User>;
  login(email: string, password: string): Promise<User | null>;
  blackListedToken(token:String): Promise<any | null>;
}