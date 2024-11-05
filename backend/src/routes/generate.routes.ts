import { Router } from "express";
import GenerateController from "../controllers/generate.controller";
import validateRequest from "../middlewares/validation";
import {
  bulkUpdateUserInGenerate,
  generateScriptSchema,
} from "../joiSchemas/generate.joi";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post(
  "/",
  validateRequest(generateScriptSchema),
  GenerateController.generateScript
);

router.patch(
  "/bulk-update",
  authMiddleware,
  validateRequest(bulkUpdateUserInGenerate),
  GenerateController.bulkUpdateUserInGenerate
);

router.get("/", authMiddleware, GenerateController.getAllGenerates);

export default router;
