import express from "express";
import {
    loginValidator,
    signupValidator,
} from "../middlewares/userValidation/userValidation";
import { UserController } from "../../adapters/controllers/userController";
import { UserRepository } from "../../adapters/repositories/userRepository";
import { AuthService } from "../services/authService";
import { UserInteractor } from "../../application/usecases/users/userInteractor";
import {  authenticateToken } from "../middlewares/isAuthenticated";

const authService = new AuthService();
const repository = new UserRepository();
const interactor = new UserInteractor(repository);
const controller = new UserController(interactor,authService);


const router = express.Router();

router.post("/register", signupValidator,controller.onCustomerSignUp.bind(controller));
router.post("/login", loginValidator, controller.onCustomerLogin.bind(controller));
router.post("/order", authenticateToken, controller.onCustomerOrder.bind(controller));
router.delete("/logout",authenticateToken,controller.onUserLogout.bind(controller));


export { router as userRouter };