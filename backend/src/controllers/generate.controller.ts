import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response.util";
import GenerateService from "../services/generate.service";

const generateScript = async (req: Request, res: Response) => {
  try {
    const { keywords, tone, ageGroup } = req.body;
    const generateScript = await GenerateService.generateScript(
      keywords,
      tone,
      ageGroup
    );
    successResponse(res, generateScript, "Script created");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

const bulkUpdateUserInGenerate = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const userId = req.user || "";

    const updatedData = await GenerateService.bulkUpdateUserInGenerate(
      userId,
      data
    );

    successResponse(res, updatedData, "Data Updated");
  } catch (error) {
    errorResponse(
      res,
      (error as Error).message || "Error Occured while storing"
    );
  }
};

const getAllGenerates = async (req: Request, res: Response) => {
  try {
    const userId = req.user || "";
    const allGenerates = await GenerateService.getAllGenerates(userId);

    successResponse(res, allGenerates, "All Generates retrieved");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

export default {
  generateScript,
  bulkUpdateUserInGenerate,
  getAllGenerates,
};
