import React from "react";
import Logo from "../common/logo";
import Button from "../common/button";
import { ROUTES } from "../../config/routes";
import { useUserAuth } from "../../hooks/auth-hook";
import { Link } from "react-router-dom";

const Header = () => {
  const { logoutUser, isAuthenticated } = useUserAuth();
  return (
    <div className=" px-4 md:px-8 lg:px-12 py-3 lg:py-5 bg-white flex items-center justify-between shadow-md sticky top-0 z-50">
      <Logo
        textStyle="text-xl text-primary"
        iconStyle="text-primary text-xl"
        containerStyle="gap-2"
      />
      <div className="flex items-center gap-5">
        <Link
          className="before:absolute before:h-1 before:w-full before:-bottom-1 before:-left-24 hover:opacity-50 transition-all duration-300 hover:before:left-0 before:bg-primary relative before:transition-all before:duration-300 before:opacity-0 hover:before:opacity-100"
          to={ROUTES.HOME}
        >
          Generate Ideas
        </Link>
        {isAuthenticated && (
          <>
            <Link
              className="before:absolute before:h-1 before:w-full before:-bottom-1 before:-left-24 hover:opacity-50 transition-all duration-300 hover:before:left-0 before:bg-primary relative before:transition-all before:duration-300 before:opacity-0 hover:before:opacity-100"
              to={ROUTES.IDEAS}
            >
              Your Ideas
            </Link>
            <Link
              className="before:absolute before:h-1 before:w-full before:-bottom-1 before:-left-24 hover:opacity-50 transition-all duration-300 hover:before:left-0 before:bg-primary relative before:transition-all before:duration-300 before:opacity-0 hover:before:opacity-100"
              to={ROUTES.BOOKMARKS}
            >
              Bookmarks
            </Link>
          </>
        )}
        <Button
          onClick={logoutUser}
          link={ROUTES.SIGN_IN}
          text={isAuthenticated ? "Log out" : "Log in"}
          animation
          className="text-sm"
        />
      </div>
    </div>
  );
};

export default Header;
