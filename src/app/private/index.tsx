import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { PrivateRouteProps } from "../../utils/types/routes";

export default function PrivateRoute({ element, isAuthenticated, ...rest }: PrivateRouteProps) {
  return isAuthenticated ? (
    <Fragment>{element}</Fragment>
  ) : (
    <Navigate to="/login" />
  );
}