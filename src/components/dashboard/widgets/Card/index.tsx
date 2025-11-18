interface CardProps {
  title: string;
  value?: string | number;
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, value, children, className = "" }) => {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
      {value !== undefined && (
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default Card;
