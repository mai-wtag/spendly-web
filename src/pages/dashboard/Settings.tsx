import { useSelector } from "react-redux";
import type { RootState } from "reduxToolkit/store";
import PageHeader from "components/dashboard/common/PageHeader";
import Card from "components/dashboard/widgets/Card";

const Settings: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="User Information">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="text-base font-medium text-gray-800">
                {user?.fullName || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="text-base font-medium text-gray-800">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </Card>

        <Card title="Account Actions">
          <div className="space-y-3">
            <button className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
              Change Password
            </button>
            <button className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
              Update Profile
            </button>
            <button className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
              Notification Settings
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Full settings functionality will be added in future updates
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
