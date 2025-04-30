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


    async onUserSignUp(req: Request, res: Response, next: NextFunction) {
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
                email: user?.email,
                phoneNumber: user?.phoneNumber,
                deliveryAddress: user?.deliveryAddress,
              };

            const token = this.authService.generateToken(data);
            console.log(token)

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
}