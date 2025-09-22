import React from "react";

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={`h-10 w-auto text-teal-400 ${className || ""}`}
    fill="currentColor"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default Logo;
