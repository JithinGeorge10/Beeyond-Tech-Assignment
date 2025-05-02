import { Request, Response, NextFunction } from "express";
import { IUserInteractor } from "../../application/interfaces/user/IuserInteractor";
import { validationResult } from "express-validator";
import { IAuthService } from "../../application/interfaces/service/IAuthService";
import { ErrorResponse } from "../../utils/errors";


export class UserController {
  private interactor: IUserInteractor;
  private authService: IAuthService;
  constructor(interactor: IUserInteractor, authService: IAuthService) {
    this.interactor = interactor;
    this.authService = authService;
  }


  async onCustomerSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let err = errors.array();
        throw new ErrorResponse(err[0].msg, 401);
      }
      const body = req.body;
      const user = await this.interactor.signup(body);
      const data = {
        _id: user?._id,
        fullName: user?.fullName,
        phoneNumber: user?.phoneNumber,
        deliveryAddress: user?.deliveryAddress,
      };

      const token = this.authService.generateToken(data);

      res.setHeader('Authorization', `Bearer ${token}`);

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
          id: user?._id,
          fullName: user?.fullName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          deliveryAddress: user?.deliveryAddress
        }
      });

    } catch (error) {
      next(error);
    }
  }

  async onCustomerLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ErrorResponse("Invalid email or password", 401);
      }
      const { email, password } = req.body;
      const user = await this.interactor.login(email, password);

      const data = {
        _id: user?._id,
        fullName: user?.fullName,
        phoneNumber: user?.phoneNumber,
        deliveryAddress: user?.deliveryAddress,
      };
      const token = this.authService.generateToken(data);

      res.setHeader('Authorization', `Bearer ${token}`);

      res.status(201).json({
        success: true,
        message: 'Logged in successfully',
        data: {
          id: user?._id,
          fullName: user?.fullName,
          phoneNumber: user?.phoneNumber,
          deliveryAddress: user?.deliveryAddress
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // In your controller
  async onUserLogout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = (req as any).user; // decoded JWT payload
      if (!user || !user._id) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }
      const token=(req as any).token
      const blackListedToken = await this.interactor.blackListedToken(token);

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }

}