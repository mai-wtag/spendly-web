import React from "react";
import clsx from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, error, type = "text", ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={props.id} className="sr-only">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={clsx(
            "w-full p-2 rounded-lg bg-light border border-border-light focus:outline-none focus:ring-2 focus:ring-teal-400",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
