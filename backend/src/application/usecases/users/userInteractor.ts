import { User } from "../../../entities/User";
import { ErrorResponse } from "../../../utils/errors";
import { IUserRepository } from "../../interfaces/user/IuserRepository";
import { IUserInteractor } from "../../interfaces/user/IuserInteractor";
import {
  comparePassword,
  generateHashPassword,
} from "../../../infrastructure/middlewares/hashPasswordMiddleware";
export class UserInteractor implements IUserInteractor {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;

  }

  async signup(user: User): Promise<User> {
    try {
      const userExist = await this.repository.findByEmail(user.email);

      if (userExist) {
        throw new ErrorResponse("user aldready registered", 400);
      }

      const newUser = await this.repository.add(user);

      return newUser;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  async login(email: string, password: string): Promise<User | null> {
    try {
      let user = await this.repository.findByEmail(email);

      if (!user || !user.password) {
        throw new ErrorResponse("user dosen't exist", 404);
      }

      const passwordMatch = await comparePassword(password, user.password);

      if (!passwordMatch) {
        throw new ErrorResponse("password dosen't match", 400);
      }

      return user;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async blackListedToken(token: string): Promise<any | null> {
    try {
      console.log(token);
      const tokenExist = await this.repository.findByBlackListToken(token);

      if (tokenExist) {
        throw new ErrorResponse("blackListedToken", 400);
      }

      return true

    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  
  async addBlackListedToken(token: string): Promise<any | null> {
    try {
  
      let user = await this.repository.addTokenBlackList(token);
      return user

    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async addOrder(items: [], total: number, address: string, userId: string): Promise<any | null> {
    try {
    
      const orderId = await this.repository.createOrder(items,total,address,userId);
      return orderId
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  
  async getSingleOrder(orderId: string): Promise<any | null> {
    try {
    
      const orderData = await this.repository.getSingleOrder(orderId);
      return orderData
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  
  async getOrders(userId:string): Promise<any | null> {
    try {
    
      const orderData = await this.repository.getOrders(userId);
      return orderData
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
}