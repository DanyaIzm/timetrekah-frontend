import useUser from "../hooks/use-user";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/auth-context";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import PageLoader from "../components/PageLoader";

const ProtectedRoute = ({ Component, ...props }) => {
  const { token } = useContext(AuthContext);
  const { user, error, isLoading } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [token, user, isLoading]);

  if (isLoading || !user) {
    return <PageLoader />;
  }

  return <Component />;
};

export default ProtectedRoute;
