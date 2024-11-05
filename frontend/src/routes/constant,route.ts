import { lazy } from "react";
import { ROUTES } from "../config/routes";
import Bookmarks from "../pages/bookmarks";
import Ideas from "../pages/ideas";

const Home = lazy(() => import("../pages/home/index"));
const SignIn = lazy(() => import("../pages/auth/SignIn"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));

export const ALL_ROUTES = [
  { path: ROUTES.SIGN_IN, element: SignIn, isPrivate: false },
  { path: ROUTES.SIGN_UP, element: SignUp, isPrivate: false },
  { path: ROUTES.HOME, element: Home, isPrivate: false },
  { path: ROUTES.BOOKMARKS, element: Bookmarks, isPrivate: true },
  { path: ROUTES.IDEAS, element: Ideas, isPrivate: true },
];
