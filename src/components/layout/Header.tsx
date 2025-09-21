import React, { ReactNode } from "react";
import Logo from "components/Logo";

interface HeaderProps {
  title: string;
  action?: ReactNode; // Optional button or any element
}

const Header: React.FC<HeaderProps> = ({ title, action }) => {
  return (
    <header className="bg-surface-light">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-black">{title}</h1>
        </div>
        {/* Render action button if provided */}
        {action && <div>{action}</div>}
      </div>
    </header>
  );
};

export default Header;
