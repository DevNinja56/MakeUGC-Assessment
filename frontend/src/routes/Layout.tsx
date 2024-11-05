import React, { ReactNode, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../config/routes";
import Header from "../components/layout/header";
import { useUserAuth } from "../hooks/auth-hook";
import { getToken } from "../utils/axios/token";
import ScreenLoader from "../components/common/loaderSpinner/ScreenLoader";
import Footer from "../components/layout/footer";

interface LayoutProps {
  isPrivate: boolean;
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isPrivate, children }) => {
  const location = useLocation();

  const { refetchUser, isAuthenticated, isLoading } = useUserAuth();
  const token = getToken();

  useEffect(() => {
    token && !isAuthenticated && refetchUser();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isPrivate && !isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} replace state={{ from: location }} />;
  }

  if (!isPrivate && !isLoading && isAuthenticated) {
    if (
      location.pathname === ROUTES.SIGN_IN ||
      location.pathname === ROUTES.SIGN_UP
    ) {
      return <Navigate to={ROUTES.HOME} replace />;
    }
  }

  if (isLoading) return <ScreenLoader />;

  return children ? (
    <>
      {location.pathname !== ROUTES.SIGN_IN &&
        location.pathname !== ROUTES.SIGN_UP && <Header />}
      {children}
      {location.pathname !== ROUTES.SIGN_IN &&
        location.pathname !== ROUTES.SIGN_UP && <Footer />}
    </>
  ) : (
    <Outlet />
  );
};

export default Layout;
