import { IUserRepository } from "../../application/interfaces/user/IuserRepository";
import { User } from "../../entities/User";
import { UserModel } from "../../infrastructure/db/models/userModel";
import { ErrorResponse } from "../../utils/errors";

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
//   async allUsers(): Promise<User[]> {
//     try {
//       const users = await UserModel.find({ role: { $ne: "admin" } });
//       return users;
//     } catch (error: any) {
//       throw new ErrorResponse(error.message, error.status);
//     }
//   }


  async findOne(id: string): Promise<User | null> {
    try {
      const data = await UserModel.findById(id);
      return data;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
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
      const data = new UserModel(user);
      await data.save();
      return data;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
   
}