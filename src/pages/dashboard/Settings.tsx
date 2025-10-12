import { useSelector } from "react-redux";
import type { RootState } from "reduxToolkit/store";

const Settings: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account preferences</p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-lg font-semibold mb-4">User Information</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-base font-medium">{user?.fullName || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium">{user?.email}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          User settings and preferences will be added in later PRs.
        </p>
      </div>
    </div>
  );
};

export default Settings;
