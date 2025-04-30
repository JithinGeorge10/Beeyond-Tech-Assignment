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




}