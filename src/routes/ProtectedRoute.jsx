import useUser from "../hooks/use-user";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/auth-context";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ Component, ...props }) => {
  const { token } = useContext(AuthContext);
  const { user, error, isLoading } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(123);

    console.log("Protected", user, token, isLoading);

    if (!isLoading && !user) {
      console.log(321);
      navigate("/login");
    }
  }, [token, user, isLoading]);

  if (isLoading || !user) {
    return <CircularProgress />;
  }

  return <Component />;
};

export default ProtectedRoute;
