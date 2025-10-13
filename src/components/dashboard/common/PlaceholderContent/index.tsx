interface PlaceholderContentProps {
  message: string;
}

const PlaceholderContent: React.FC<PlaceholderContentProps> = ({ message }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <p className="text-gray-600">{message}</p>
        <p className="text-sm text-gray-400 mt-2">
          Full functionality will be added in future updates
        </p>
      </div>
    </div>
  );
};

export default PlaceholderContent;
