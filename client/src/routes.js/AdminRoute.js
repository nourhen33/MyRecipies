import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useSelector((state) => state.user);

 
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/home" replace />;

  return <Outlet />;
};

export default AdminRoute;
