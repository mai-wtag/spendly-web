import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return <div className="p-6 space-y-6">{children}</div>;
};

export default DashboardLayout;
