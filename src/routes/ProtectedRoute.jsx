import { Navigate, redirect, useNavigate } from "react-router";
import useUser from "../hooks/use-user";
import { useEffect } from "react";

const ProtectedRoute = ({ Component, ...props }) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <>123</>;
  }

  if (!user && error) {
    window.location = "/login";
    return;
  }

  return <Component />;
};

export default ProtectedRoute;
