import { Router } from "express";
const router: Router = Router();
import * as AuthController from "../Controllers/authController";

// REGISTER USER
router.post("/register", AuthController.CreateRegister);
// LOGIN USER
router.post("/login", AuthController.Login);


export default router;
