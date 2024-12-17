import { useContext, useEffect } from "react";
import useUser from "../hooks/use-user";
import AuthContext from "../contexts/auth-context";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

const OnlyUnauthorizedRoute = ({ Component, ...props }) => {
  const { token } = useContext(AuthContext);
  const { user, error, isLoading } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/");
    }
  }, [token, user, isLoading]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return <Component />;
};

export default OnlyUnauthorizedRoute;
