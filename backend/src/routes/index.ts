import { Router } from "express";
import userRoutes from "./user.routes";
import trendRoutes from "./trend.routes";
import generate from "./generate.routes";
import bookmark from "./bookmark.routes";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use("/users", userRoutes);
router.use("/trends", trendRoutes);
router.use("/generate", generate);
router.use("/bookmark", authMiddleware, bookmark);

export default router;
