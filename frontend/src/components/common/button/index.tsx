import React from "react";
import LoaderSpinner from "../loaderSpinner";
import { Link } from "react-router-dom";

interface propTypes {
  disabled?: boolean;
  link?: string;
  text?: string;
  className?: string;
  isLoader?: boolean;
  variant?: string;
  icon?: React.ReactElement;
  iconAfterText?: React.ReactElement;
  onClick?: () => void;
  padding?: string;
  radius?: string;
  buttonColor?: string;
  color?: string;
  image?: string;
  animation?: boolean;
  type?: "submit" | "reset" | "button";
}

const Button = ({
  disabled = false,
  link = "",
  text,
  className,
  isLoader,
  variant = "filled",
  icon,
  iconAfterText,
  onClick,
  padding,
  radius,
  buttonColor = "primary",
  color,
  image,
  animation,
  type = "submit",
  ...props
}: propTypes) => {
  const baseStyles = `${radius || "rounded-md"} ${
    padding || "px-5 py-2.5"
  } disabled:cursor-not-allowed flex gap-2 justify-center items-center group transition-all duration-300 relative ${
    animation && "button-animation"
  }  overflow-hidden`;

  const primary =
    variant === "outline"
      ? "border-2 border-primary text-primary hover:bg-primary hover:text-white"
      : "bg-primary text-white hover:bg-primary-dark";
  const secondary =
    variant === "outline"
      ? "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white"
      : "bg-secondary text-white hover:bg-secondary-dark";

  const colorStyles =
    buttonColor === "primary"
      ? primary
      : buttonColor === "secondary"
      ? secondary
      : variant === "outline"
      ? `border-2 border-${buttonColor} text-${buttonColor} hover:bg-${buttonColor} hover:text-white`
      : `bg-${buttonColor} text-${
          color ? color : "white"
        } hover:bg-${buttonColor}/70`;

  const buttonClassNames = `${baseStyles} ${colorStyles} ${className}`;

  return link ? (
    <Link to={link}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={buttonClassNames}
        {...props}
      >
        <>
          {image}
          {icon}
          {text}
          {iconAfterText}
        </>
        {isLoader && <LoaderSpinner color="text-white" />}
      </button>
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClassNames}
      {...props}
    >
      <>
        {image}
        {icon}
        {text}
        {iconAfterText}
      </>
      {isLoader && <LoaderSpinner className="group-hover:text-mainBlue" />}
    </button>
  );
};

export default Button;
