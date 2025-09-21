import React, { ReactNode } from "react";
import Header from "components/layout/Header";

interface LayoutProps {
  children: ReactNode;
  headerAction?: ReactNode; // Optional action to pass to header
}

const Layout: React.FC<LayoutProps> = ({ children, headerAction }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header title="Spendly" action={headerAction} />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
