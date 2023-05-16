import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ children, ...props }) => {
  return (
    <Routes>
      <Route path="/" element={props.loggedIn ? children : <Navigate to="/sign-in" />}>/
      </Route>
    </Routes>
  );// отправляйся на вход если не логдин
};

export default ProtectedRoute;