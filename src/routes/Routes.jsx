import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";

import AuthContext from "../contexts/auth-context";
import useAuthContext from "../hooks/use-auth-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute.jsx";
import OnlyUnauthorizedRoute from "./OnlyUnauthorizedRoute.jsx";

const Routes = () => {
  const context = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute Component={App} />,
    },
    {
      path: "/register",
      element: <OnlyUnauthorizedRoute Component={RegisterPage} />,
    },
    {
      path: "/login",
      element: <OnlyUnauthorizedRoute Component={LoginPage} />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <AuthContext.Provider value={context}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default Routes;
