import { ROUTES } from "../config/routes";
import { verifyUser } from "../store/actions/verify-user";
import { loggedIn, logout, updateUser } from "../store/slices/auth.slice";
import { userType } from "../types";
import { deleteCookie, setCookie } from "../utils/cookies";
import { useAppDispatch, useAppSelector } from "./redux-hook";
import { useNavigate } from "react-router-dom";

type logInUserType = {
  access: string;
};

export const useUserAuth = () => {
  const state = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const updateUserDetails = (obj: userType) => dispatch(updateUser(obj));
  const refetchUser = () => dispatch(verifyUser());

  const logoutUser = () => {
    dispatch(logout());
    deleteCookie("access_token");
    navigate(ROUTES.SIGN_IN);
  };

  const loggedInUser = ({ access }: logInUserType) => {
    dispatch(loggedIn());
    setCookie("access_token", access);
  };

  return {
    ...state,
    refetchUser,
    updateUserDetails,
    logoutUser,
    loggedInUser,
  };
};
