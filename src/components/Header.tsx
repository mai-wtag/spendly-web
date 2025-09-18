import React from "react";
import Logo from "./Logo";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-surface-light ">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo/>
          <h1 className="text-xl font-black">
            {title}
          </h1>
        </div>
        <a
          href="#"
          className="px-6 py-2 rounded-lg text-sm font-semibold bg-teal-100 text-teal-400 hover:bg-teal-200 hover:text-teal-600 transition-colors"
        >
          Sign Up
        </a>
      </div>
    </header>
  );
};

export default Header;
