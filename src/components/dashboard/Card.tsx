import React from "react";

interface CardProps {
  title: string;
  value?: string | number;
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, value, children, className = "" }) => {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <p className="text-lg font-semibold text-black mb-4">{title}</p>
      {value !== undefined && <p className="text-2xl font-bold my-2">{value}</p>}
      {children}
    </div>
  );
};

export default Card;
