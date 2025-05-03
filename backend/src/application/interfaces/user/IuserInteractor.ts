import { User } from "../../../entities/User";

export interface IUserInteractor {
 
  signup(user: User): Promise<User>;
  login(email: string, password: string): Promise<User | null>;
  blackListedToken(token:String): Promise<any | null>;
  addOrder(items:[],total:number,address:string,userId:string): Promise<any | null>;
  getSingleOrder(orderId:string): Promise<any | null>;
  getOrders(user:string): Promise<any | null>;
  addBlackListedToken(token:String): Promise<any | null>;

  
  
  
}