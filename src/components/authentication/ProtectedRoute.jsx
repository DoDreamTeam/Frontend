import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isMemberOnly = false }) => {
  const { isAuthenticated } = useAuth();

  if (isMemberOnly && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
