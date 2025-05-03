import express from "express";
import {
    loginValidator,
} from "../middlewares/userValidation/userValidation";

import { AuthService } from "../services/authService";
import { AdminController } from "../../adapters/controllers/adminController";
import { AdminInteractor } from "../../application/usecases/admin/adminInteractor";
import { AdminRepository } from "../../adapters/repositories/adminRepository";
import { authenticateToken } from "../middlewares/isAuthenticated";

const authService = new AuthService();
const repository = new AdminRepository();
const interactor = new AdminInteractor(repository);
const controller = new AdminController(interactor, authService);


const router = express.Router();

router.post("/login", loginValidator,controller.onAdminLogin.bind(controller));
router.get("/allOrders",authenticateToken, controller.onAllOrders.bind(controller));
router.get("/delivery-partners",authenticateToken, controller.onAllDeliveryPartner.bind(controller));
router.delete("/logout", authenticateToken, controller.onAdminLogout.bind(controller));


export { router as adminRouter };