import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../layouts/Loader";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    return navigate("/login");
  }
  //   if (isAuthenticated) {
  //     //   if (isAdmin === true && user.role !== "admin") {
  //     //     return <Navigate to="/" />;
  //     //   }
  //     return children;
  //   }
  //   if (loading) {
  //     return <Loader />;
  //   }
  return children;
}

export default ProtectedRoute;
