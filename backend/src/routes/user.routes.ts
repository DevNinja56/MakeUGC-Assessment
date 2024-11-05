import { Router } from "express";
import UserController from "../controllers/users.controller";
import validateRequest from "../middlewares/validation";
import { loginSchema, registerSchema } from "../joiSchemas/user.joi";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  UserController.registerUser
);

router.post("/login", validateRequest(loginSchema), UserController.loginUser);

router.get("/verify-user", authMiddleware, UserController.verifyUser);

export default router;
