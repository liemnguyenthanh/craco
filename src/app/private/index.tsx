import { FC } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "@/layout";

interface Props {
  element: JSX.Element;
  isAuthenticated: boolean
}

const PrivateRoute: FC<Props> = ({ element, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <MainLayout>
    {element}
  </MainLayout>;
};

export default PrivateRoute