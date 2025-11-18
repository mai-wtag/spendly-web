import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, className, ...props }) => {
  return (
    <button
      className={clsx(
        "w-full flex justify-center p-2 border-none rounded-lg shadow-sm font-medium text-white bg-teal-400 hover:bg-teal-500",
        className
      )}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
