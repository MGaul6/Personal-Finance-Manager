import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Spinner from "../../utils/spinners";

function PrivateRoute({ path, component }) {
  const Component = component;
  const auth = useSelector((state) => state.Auth);
  // object destructuring
  const { isAuthenticated, loading } = auth;

  return (
    <Route
      path={path}
      render={(properties) => {
        if (!isAuthenticated && loading) return <Spinner />;
        if (!isAuthenticated && !loading) return <Redirect to="/login" />;
        return <Component {...properties} />;
      }}
    />
  );
}
export default PrivateRoute;
