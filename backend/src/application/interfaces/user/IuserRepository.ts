import { User } from "../../../entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  add(user: User): Promise<User>;
  addTokenBlackList(token:string): Promise<any>;
  findByBlackListToken(token:string): Promise<any>;
  createOrder(items:[],total:number,address:string,userId:string): Promise<any>;
  getSingleOrder(orderId:string): Promise<any>;
  getOrders(): Promise<any>;

  
  
  
}