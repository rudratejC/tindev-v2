import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

const SemiProtected = ({ children, ...rest }) => {
  const user = useSelector((state) => state.userReducer.user);
  const activated = useSelector((state) => state.userReducer.activated);

  return (
    <Routes>
      <Route
        {...rest}
        element={
          user ? (
            <Navigate to="/home" />
          ) : user && !activated ? (
            children
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default SemiProtected;
