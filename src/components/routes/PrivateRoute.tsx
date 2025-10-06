import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "store";
import AppLayout from "components/layout/AppLayout";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized) return null;

  return isAuthenticated ? <AppLayout/> : <Navigate to="/" replace />;
};

export default PrivateRoute;
