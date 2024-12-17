import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";

import AuthContext from "../contexts/auth-context";
import useAuthContext from "../hooks/use-auth-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute.jsx";
import OnlyUnauthorizedRoute from "./OnlyUnauthorizedRoute.jsx";
import { Stack } from "@mui/material";
import TablePage from "../pages/TablePage.jsx";
import ActivityCreationPage from "../pages/ActivityCreationPage.jsx";
import TitleCreationPage from "../pages/TitleCreationPage.jsx";

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
      path: "/table",
      element: <ProtectedRoute Component={TablePage} />,
    },
    {
      path: "/create-activity",
      element: <ProtectedRoute Component={ActivityCreationPage} />,
    },
    {
      path: "/create-title",
      element: <ProtectedRoute Component={TitleCreationPage} />,
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <AuthContext.Provider value={context}>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        justifyItems={"center"}
        alignContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        <RouterProvider router={router} />
      </Stack>
    </AuthContext.Provider>
  );
};

export default Routes;
