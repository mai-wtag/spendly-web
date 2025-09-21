import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={props.id} className="sr-only">
          {label}
        </label>
      )}
      <input
        className={`w-full p-2 rounded-lg bg-light border border-border-light focus:outline-none focus:ring-2 focus:ring-teal-400 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
