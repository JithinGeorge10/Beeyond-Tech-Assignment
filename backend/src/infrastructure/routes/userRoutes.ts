import express from "express";
import {
    signupValidator,
} from "../middlewares/userValidation/userValidation";
import { UserController } from "../../adapters/controllers/userController";
import { UserRepository } from "../../adapters/repositories/userRepository";
import { AuthService } from "../services/authService";
import { UserInteractor } from "../../application/usecases/users/userInteractor";
const authService = new AuthService();
const repository = new UserRepository();
const interactor = new UserInteractor(repository);
const controller = new UserController(interactor,authService);


const router = express.Router();

router.post("/register",  controller.onCustomerSignUp.bind(controller));
router.post("/login",  controller.onCustomerLogin.bind(controller));

export { router as userRouter };