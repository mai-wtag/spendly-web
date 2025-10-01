import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { loadUser } from "slices/authSlice";
import RouteComponent from "./RouteComponent";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isInitialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-600 text-lg">Loading...</span>
      </div>
    );
  }

  return <RouteComponent />;
};

export default App;
