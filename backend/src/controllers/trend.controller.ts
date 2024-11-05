import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response.util";
import TrendsService from "../services/trend.service";
import requestIp from "request-ip";

const getAllTrends = async (req: Request, res: Response) => {
  try {
    const clientIp = requestIp.getClientIp(req)?.split(":").at(-1);

    const ipRes = await fetch(
      `https://ipinfo.io/${clientIp}?token=a39304ea8e4d4e`
    );

    const ipData = await ipRes.json();
    const geo: string = (ipData as { country?: string }).country || "US";

    const allTrends = await TrendsService.getAllTrends(geo);
    successResponse(res, allTrends, "All trends reterieved");
  } catch (error) {
    errorResponse(
      res,
      (error as Error).message || "There is error in your country code"
    );
  }
};

export default {
  getAllTrends,
};
