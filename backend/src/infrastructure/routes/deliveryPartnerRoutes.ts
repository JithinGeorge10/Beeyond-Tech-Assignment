import express from "express";
import {
    loginValidator,
    signupValidator,
} from "../middlewares/deliveryPartnerValidation/deliveryPartnerValidation";
import { DeliveryPartnerController } from "../../adapters/controllers/deliveryPartnerController";
import { DeliveryPartnerRepository } from "../../adapters/repositories/deliveryPartnerRepository";
import { AuthService } from "../services/authService";
import { DeliveryPartnerInteractor } from "../../application/usecases/deliveryPartners/deliveryPartnerInteractor";
import { authenticateToken } from "../middlewares/isAuthenticated";

const authService = new AuthService();
const repository = new DeliveryPartnerRepository();
const interactor = new DeliveryPartnerInteractor(repository);
const controller = new DeliveryPartnerController(interactor,authService);


const router = express.Router();

router.post("/register", signupValidator, controller.onDeliveryPartnerSignUp.bind(controller));
router.post("/login", loginValidator, controller.onDeliveryPartnerLogin.bind(controller));
router.get("/orders/unassigned", authenticateToken, controller.onUnassignedOrders.bind(controller));
router.patch("/orders/accept", authenticateToken, controller.onAcceptOrder.bind(controller));
router.patch("/orders/delivered", authenticateToken, controller.onDeliverOrder.bind(controller));
router.get("/orders/activeOrders", authenticateToken, controller.onActiveOrders.bind(controller));
router.get("/orders/deliveredOrders", authenticateToken, controller.onFetchDeliveredOrders.bind(controller));
router.delete("/logout", authenticateToken, controller.onUserLogout.bind(controller));



export { router as deliveryPartnerRouter };