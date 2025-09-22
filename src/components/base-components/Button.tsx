import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: String;
}

const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <button
      className="w-full flex justify-center p-2 border-none rounded-lg shadow-sm font-medium text-white bg-teal-400 hover:bg-teal-500 "
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
