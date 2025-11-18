import { useSelector } from "react-redux";
import { 
  User, 
  Mail, 
  CheckCircle, 
  Calendar, 
  Shield, 
} from "lucide-react";
import type { RootState } from "reduxToolkit/store";
import PageHeader from "components/dashboard/common/PageHeader";
import Card from "components/dashboard/widgets/Card";

const Settings: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const accountCreated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences and application settings"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card title="Profile">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                {user?.fullName?.charAt(0).toUpperCase() || 
                 user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {user?.fullName || "User"}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{user?.email}</p>
              
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle size={14} />
                Active Account
              </span>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card title="Account Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <User size={20} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-base font-medium text-gray-800">
                    {user?.fullName || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="text-base font-medium text-gray-800 break-all">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Calendar size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <p className="text-base font-medium text-gray-800">
                    {accountCreated}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Shield size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Account Type</p>
                  <p className="text-base font-medium text-gray-800">Free Plan</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="pt-48"></div>

      <Card title="About Spendly">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Version <span className="font-mono font-semibold">1.0.0</span>
            </p>
            <p className="text-xs text-gray-500">
              © 2025 Spendly. All rights reserved.
            </p>
          </div>
          <div className="flex gap-3 text-xs">
            <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
              Help Center
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
              Terms of Service
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
              Privacy
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
