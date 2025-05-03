import { Request, Response, NextFunction } from "express";
import { IDeliveryPartnerInteractor } from "../../application/interfaces/deliveryPartner/IdeliveryPartnerInteractor";
import { validationResult } from "express-validator";
import { IAuthService } from "../../application/interfaces/service/IAuthService";
import { ErrorResponse } from "../../utils/errors";


export class DeliveryPartnerController {
  private interactor: IDeliveryPartnerInteractor;
  private authService: IAuthService;
  constructor(interactor: IDeliveryPartnerInteractor, authService: IAuthService) {
    this.interactor = interactor;
    this.authService = authService;
  }


  async onDeliveryPartnerSignUp(req: Request, res: Response, next: NextFunction) {
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
        phoneNumber: user?.phoneNumber
      };

      const token = this.authService.generateToken(data);

      res.setHeader('Authorization', `Bearer ${token}`);

      res.status(201).json({
        success: true,
        message: 'Delivery partner created successfully',
        data: {
          id: user?._id,
          fullName: user?.fullName,
        }
      });

    } catch (error) {
      next(error);
    }
  }

  async onDeliveryPartnerLogin(req: Request, res: Response, next: NextFunction) {
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
      };
      const token = this.authService.generateToken(data);

      res.setHeader('Authorization', `Bearer ${token}`);

      res.status(201).json({
        success: true,
        message: 'Delivery partner Logged in successfully',
        data: {
          id: user?._id,
          fullName: user?.fullName,
        }
      });
    } catch (error) {
      next(error);
    }
  }



  async onUnassignedOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = (req as any).user;
      if (!user || !user._id) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }
      const token = (req as any).token
      const verifiedToken = await this.interactor.blackListedToken(token);
      if (!verifiedToken) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }
      const orderData = await this.interactor.getOrders();
      console.log(orderData);

      res.status(201).json({
        success: true,
        message: 'Fetched orders successfully',
        data: { orderData }
      });
    } catch (error) {
      next(error);
    }
  }

  


  async onActiveOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = (req as any).user;
      if (!user || !user._id) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }
      const token = (req as any).token
      const verifiedToken = await this.interactor.blackListedToken(token);
      if (!verifiedToken) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }
      const orderData = await this.interactor.getActiveOrders(user);
      console.log(orderData);

      res.status(201).json({
        success: true,
        message: 'Fetched orders successfully',
        data: { orderData }
      });
    } catch (error) {
      next(error);
    }
  }


  async onFetchDeliveredOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = (req as any).user;
      if (!user || !user._id) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }
      const token = (req as any).token
      const verifiedToken = await this.interactor.blackListedToken(token);
      if (!verifiedToken) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }
      const orderData = await this.interactor.getDeliveredOrders(user);
      console.log(orderData);

      res.status(201).json({
        success: true,
        message: 'Fetched orders successfully',
        data: { orderData }
      });
    } catch (error) {
      next(error);
    }
  }


  async onAcceptOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = (req as any).user;
      if (!user || !user._id) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }
      const token = (req as any).token
      const verifiedToken = await this.interactor.blackListedToken(token);
      if (!verifiedToken) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }
      const { orderId } = req.body; 
      const orderData = await this.interactor.acceptOrders(orderId,user);
      console.log(orderData);

      res.status(201).json({
        success: true,
        message: 'orders accepted successfully',
      });
    } catch (error) {
      next(error);
    }
  }


  async onDeliverOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = (req as any).user;
      if (!user || !user._id) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }
      const token = (req as any).token
      const verifiedToken = await this.interactor.blackListedToken(token);
      if (!verifiedToken) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }
      const { orderId } = req.body; 
      const orderData = await this.interactor.deliveredOrders(orderId);
      console.log(orderData);

      res.status(201).json({
        success: true,
        message: 'orders delivered successfully',
      });
    } catch (error) {
      next(error);
    }
  }



}