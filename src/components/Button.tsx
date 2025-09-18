import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="w-full flex justify-center p-2 border-none rounded-lg shadow-sm text-sm font-bold text-white bg-teal-400 hover:bg-teal-500 "
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
