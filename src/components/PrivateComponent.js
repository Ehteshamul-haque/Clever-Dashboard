import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function PrivateComponent() {
    //checking if user sign up , if sign up then show outlet else navigate to signup on every link
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/signup" />;
}

export default PrivateComponent;
