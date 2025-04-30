import express from "express";
import {
    signupValidator,
} from "../middlewares/userValidation/userValidation";

import { AuthService } from "../services/authService";
import { AdminController } from "../../adapters/controllers/adminController";
import { AdminInteractor } from "../../application/usecases/admin/adminInteractor";
import { AdminRepository } from "../../adapters/repositories/adminRepository";

const authService = new AuthService();
const repository = new AdminRepository();
const interactor = new AdminInteractor(repository);
const controller = new AdminController(interactor,authService);


const router = express.Router();

router.post("/login",  controller.onAdminLogin.bind(controller));

export { router as adminRouter };