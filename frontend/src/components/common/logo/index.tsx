import React from "react";
import { FaBullseye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../config/routes";

interface propTypes {
  textStyle?: string;
  iconStyle?: string;
  containerStyle?: string;
}

const Logo = ({ textStyle, iconStyle, containerStyle }: propTypes) => {
  return (
    <Link
      to={ROUTES.HOME}
      className={`flex items-center  ${containerStyle ?? "gap-3 2xl:gap-3"}`}
    >
      <FaBullseye className={iconStyle ?? "text-2xl text-white"} />
      <h1
        className={`${
          textStyle ?? "text-white text-3xl 2xl:text-4xl"
        } font-extrabold`}
      >
        UGC Ideator
      </h1>
    </Link>
  );
};

export default Logo;
