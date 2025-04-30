import { User } from "../../../entities/User";
import { ErrorResponse } from "../../../utils/errors";
import { IUserRepository } from "../../interfaces/user/IuserRepository";
import { IUserInteractor } from "../../interfaces/user/IuserInteractor";

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


  
}