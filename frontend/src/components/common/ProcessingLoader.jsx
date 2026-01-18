import React from "react";

const ProcessingLoader = ({ className = "w-8 h-8" }) => {
  return (
    <div className="z-9999 flex items-center justify-center">
      <div
        className={`border-4 border-white border-t-transparent rounded-full animate-spin ${className}`}
      ></div>
    </div>
  );
};

export default ProcessingLoader;
