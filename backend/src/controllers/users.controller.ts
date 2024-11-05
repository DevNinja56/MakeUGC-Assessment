import { Request, Response } from "express";
import UserService from "../services/user.service";
import { successResponse, errorResponse } from "../utils/response.util";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const { user, token } = await UserService.registerUser(
      name,
      email,
      password
    );
    successResponse(
      res,
      { user: { id: user._id, name: user.name, email: user.email }, token },
      "User registered successfully"
    );
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await UserService.loginUser(email, password);
    successResponse(
      res,
      { user: { id: user._id, name: user.name, email: user.email }, token },
      "User logged in successfully"
    );
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

const verifyUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user || "";
    const user = await UserService.verifyUser(userId);
    successResponse(res, user, "User found successfully");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

export default {
  registerUser,
  loginUser,
  verifyUser,
};
