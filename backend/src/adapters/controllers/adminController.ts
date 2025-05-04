import { Request, Response, NextFunction } from "express";
import { IAdminInteractor } from "../../application/interfaces/admin/IadminInteractor";
import { validationResult } from "express-validator";
import { IAuthService } from "../../application/interfaces/service/IAuthService";
import { ErrorResponse } from "../../utils/errors";


export class AdminController {
    private interactor: IAdminInteractor;
    private authService: IAuthService;
    constructor(interactor: IAdminInteractor, authService: IAuthService) {
        this.interactor = interactor;
        this.authService = authService;
    }


    async onAdminLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw new ErrorResponse("Invalid email or password", 401);
            }

            const { email, password } = req.body;



            const admin = await this.interactor.adminLogin(email, password);

            const data = {
                email: admin?.email,
                id:admin?.id
            };
            console.log(data);
            
            if(!data.email){
              res.status(201).json({
                success: true,
                message: 'give proper credentials',
            });
            }

            const token = this.authService.generateToken(data);

            console.log(token);
            res.setHeader('Authorization', `Bearer ${token}`);

            res.status(201).json({
                success: true,
                message: 'admin logged in successfully',
                data: {
                    email: admin?.email,
                }
            });
        } catch (error) {
            next(error);
        }
    }
    
     async onAllOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const user = (req as any).user;
          console.log(user);
          
          if (!user || !user.id) {
            res.status(403).json({ message: "Unauthorizedd user" });
            return;
          }
          const token = (req as any).token
          const verifiedToken = await this.interactor.blackListedToken(token);
          if (!verifiedToken) {
            res.status(403).json({ message: "Unauthorizeddd user" });
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
    
      
      async onAllDeliveryPartner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const user = (req as any).user;
          console.log(user);
          
          if (!user || !user.id) {
            res.status(403).json({ message: "Unauthorizedd user" });
            return;
          }
          const token = (req as any).token
          const verifiedToken = await this.interactor.blackListedToken(token);
          if (!verifiedToken) {
            res.status(403).json({ message: "Unauthorizeddd user" });
            return;
          }
          const orderData = await this.interactor.getDeliveryPartners();
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

      
      async onAdminLogout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const user = (req as any).user; // decoded JWT payload
          if (!user || !user.id) {
            res.status(403).json({ message: "Unauthorized user" });
            return;
          }
          const token = (req as any).token
          await this.interactor.addBlackListedToken(token);
    
          res.status(201).json({
            success: true,
            message: 'Logged out successfully'
          });
        } catch (error) {
          next(error);
        }
      }

}