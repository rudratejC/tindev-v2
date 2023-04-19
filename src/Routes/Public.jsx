import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const Public = ({ children, ...rest }) => {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <Routes>
      <Route {...rest} element={user ? <Navigate to="/feeds" /> : children} />
    </Routes>
  );
};

export default Public;
