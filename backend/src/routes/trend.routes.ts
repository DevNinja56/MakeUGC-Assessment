import { Router } from "express";
import TrendsController from "../controllers/trend.controller";

const router = Router();

router.get("/", TrendsController.getAllTrends);

export default router;
