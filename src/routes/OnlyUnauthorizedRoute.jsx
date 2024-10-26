import { useContext } from "react";
import useUser from "../hooks/use-user";
import AuthContext from "../contexts/auth-context";
import { CircularProgress } from "@mui/material";

const OnlyUnauthorizedRoute = ({ Component, ...props }) => {
  const { token } = useContext(AuthContext);
  const { error, isLoading } = useUser();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (token || !error) {
    window.location = "/";
    return;
  }

  return <Component />;
};

export default OnlyUnauthorizedRoute;
