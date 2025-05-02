import { IUserRepository } from "../../application/interfaces/user/IuserRepository";
import { User } from "../../entities/User";
import { UserModel } from "../../infrastructure/db/models/userModel";
import TokenBlacklist from '../../infrastructure/db/models/tokenBlackList'; 
import { ErrorResponse } from "../../utils/errors";
import bcrypt from 'bcrypt';

export class UserRepository implements IUserRepository {
  find(filter: any, page: any): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  update(_id: string, user: any): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  upsert(user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  filter(filter: any, page: any): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  count(filter: any): Promise<number> {
    throw new Error("Method not implemented.");
  }
  search(search: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const data = await UserModel.findOne({ email });
      return data;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  async add(user: User): Promise<User> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
      const data = new UserModel(user);
      await data.save();
      return data;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async addTokenBlackList(token: string): Promise<any> {
    try {
      await TokenBlacklist.create({ token });
      return { message: "Logged out successfully" };
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  
  async findByBlackListToken(token: string): Promise<any> {
    try {
      const blacklistedToken = await TokenBlacklist.findOne({ token });
  
      if (blacklistedToken) {
        return { message: "Token is blacklisted" };
      }
  
      return null; 
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status || 500);
    }
  }
}