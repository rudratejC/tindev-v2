import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const Protected = ({ children, ...rest }) => {
  const user = useSelector((state) => state.userReducer.user);

  console.log(user);

  return (
    <Routes>
      <Route {...rest} element={user ? children : <Navigate to="/" />} />
    </Routes>
  );
};

export default Protected;
