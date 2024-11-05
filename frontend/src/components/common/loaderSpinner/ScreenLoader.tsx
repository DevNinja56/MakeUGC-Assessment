import React from "react";
import LoaderSpinner from ".";

const ScreenLoader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <LoaderSpinner color="#1F1D0D" />
    </div>
  );
};

export default ScreenLoader;
