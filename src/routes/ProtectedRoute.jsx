import useUser from "../hooks/use-user";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/auth-context";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = ({ Component, ...props }) => {
  const { token } = useContext(AuthContext);
  const { user, error, isLoading } = useUser();

  if (!token) {
    window.location = "/login";
    return;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!user && error) {
    window.location = "/login";
    return;
  }

  return <Component />;
};

export default ProtectedRoute;
