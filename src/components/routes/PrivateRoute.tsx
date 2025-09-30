import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAppSelector((state) => state.auth);

  return auth.isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
