import React from "react";
import { Route, Redirect } from "react-router-dom";
const AdminRoute = ({ component: Component, user, ...rest }) => {
  return user !== null ? (
    <Route
      {...rest}
      render={(props) =>
        user.role === "admin" ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  ) : (
    <Redirect to="/" />
  );
};

export default AdminRoute;
