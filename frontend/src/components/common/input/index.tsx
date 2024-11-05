import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface propTypes {
  id?: string;
  className?: string;
  icon?: React.ReactElement;
  padding?: string;
  errors?: string | null;
  title?: string;
  name?: string;
  type?: string;
  placeHolder?: string;
  important?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  width?: string;
}

const Input = ({
  id,
  className,
  icon: Icon,
  padding,
  errors,
  title,
  name,
  type,
  placeHolder,
  important,
  onChange,
  value,
  width,
  ...props
}: propTypes) => {
  const [isShown, setShow] = useState(false);

  return (
    <label
      htmlFor={"input-box--" + (id ?? name)}
      className={`flex flex-col gap-y-1 ${
        width ? width : "w-full"
      } ${"text-black"}`}
    >
      <p className="flex gap-1 text-sm font-semibold">
        {title} {important && <span className="text-red-600">*</span>}
      </p>
      <div className="relative">
        <input
          {...props}
          onChange={onChange}
          value={value}
          placeholder={`${placeHolder}`}
          type={type === "password" && !isShown ? "password" : "text"}
          className={`${
            padding ?? "py-2 pl-3"
          } outline-none transition-all duration-300 ${
            errors ? "" : "text-gray border-gray"
          } ${Icon ? "pl-12" : "pl-4"} ${className}`}
          id={"input-box--" + (id ?? name)}
        />
        {Icon && (
          <span className="absolute left-0 grid h-[49px] w-[49px] place-items-center max-sm:translate-y-[-48px] sm:-top-[2px]">
            {Icon}
          </span>
        )}
        {type === "password" && (
          <span
            className={`absolute right-0 top-[1px] grid h-[60px] w-[49px] cursor-pointer place-items-center md:-top-[1px]`}
            onClick={() => setShow((prev) => !prev)}
          >
            {isShown ? (
              <HiOutlineEye className="lg:text-xl" />
            ) : (
              <HiOutlineEyeOff className="lg:text-xl" />
            )}
          </span>
        )}
      </div>
      {errors && <span className="mt-1 text-xs text-red">{errors}</span>}
    </label>
  );
};

export default Input;
