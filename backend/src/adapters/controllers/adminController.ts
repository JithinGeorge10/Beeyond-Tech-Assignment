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
            };

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





}