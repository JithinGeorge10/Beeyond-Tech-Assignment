import { User } from "../../../entities/User";

export interface IUserInteractor {
 
  signup(user: User): Promise<User>;
  
}