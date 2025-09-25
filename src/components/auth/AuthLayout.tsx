import React from "react";
import Logo from "components/base-components/Logo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  children,
}) => {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      {children}
      <p className="text-center text-sm text-gray-500">
        {footerText}{" "}
        <a
          href={footerLinkHref}
          className="font-medium text-teal-400 hover:underline"
        >
          {footerLinkText}
        </a>
      </p>
    </div>
  );
};

export default AuthLayout;
