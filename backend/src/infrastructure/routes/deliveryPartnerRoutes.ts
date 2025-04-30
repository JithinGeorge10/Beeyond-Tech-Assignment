import express from "express";
import {
    signupValidator,
} from "../middlewares/userValidation/userValidation";
import { DeliveryPartnerController } from "../../adapters/controllers/deliveryPartnerController";
import { DeliveryPartnerRepository } from "../../adapters/repositories/deliveryPartnerRepository";
import { AuthService } from "../services/authService";
import { DeliveryPartnerInteractor } from "../../application/usecases/deliveryPartners/deliveryPartnerInteractor";

const authService = new AuthService();
const repository = new DeliveryPartnerRepository();
const interactor = new DeliveryPartnerInteractor(repository);
const controller = new DeliveryPartnerController(interactor,authService);


const router = express.Router();

router.post("/register",  controller.onDeliveryPartnerSignUp.bind(controller));
router.post("/login",  controller.onDeliveryPartnerLogin.bind(controller));

export { router as deliveryPartnerRouter };