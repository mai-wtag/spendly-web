import { Routes, Route } from "react-router-dom";
import Login from "pages/Login";

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
    </Routes>
  );
};

export default RouteComponent;
