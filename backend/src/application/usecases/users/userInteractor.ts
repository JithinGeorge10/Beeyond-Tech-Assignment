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

      let user = await this.repository.addTokenBlackList(token);

    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  
  async findByBlackListToken(token: string): Promise<any | null> {
    try {
      console.log(token);
      const tokenExist = await this.repository.findByBlackListToken(token);

      if (tokenExist) {
        throw new ErrorResponse("blackListedToken", 400);
      }

      let user = await this.repository.addTokenBlackList(token);

    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }


}