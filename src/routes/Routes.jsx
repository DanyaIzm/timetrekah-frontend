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
import TitlePage from "../pages/TitlePage.jsx";
import Header from "../components/Header.jsx";
import PageWrapper from "../pages/PageWrapper.jsx";
import ActivityPage from "../pages/ActivityPage.jsx";
import HistoryPage from "../pages/HistoryPage.jsx";
import ActivitiesPage from "../pages/ActivitiesPage.jsx";
import ActivityEditPage from "../pages/ActivityEditPage.jsx";
import TitleEditPage from "../pages/TitleEditPage.jsx";

const Routes = () => {
  const context = useAuthContext();

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <PageWrapper />,
        children: [
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
            path: "/activities",
            element: <ProtectedRoute Component={ActivitiesPage} />,
          },
          {
            path: "/titles/:id",
            element: <ProtectedRoute Component={TitlePage} />,
          },
          {
            path: "/activities/:id",
            element: <ProtectedRoute Component={ActivityPage} />,
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
            path: "/edit-activity/:id",
            element: <ProtectedRoute Component={ActivityEditPage} />,
          },
          {
            path: "/edit-title/:id",
            element: <ProtectedRoute Component={TitleEditPage} />,
          },
          {
            path: "/history",
            element: <ProtectedRoute Component={HistoryPage} />,
          },
          {
            path: "/error",
            element: <ErrorPage />,
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
        ],
      },
    ],
    { basename: "/timetrekah-frontend/" }
  );

  return (
    <AuthContext.Provider value={context}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default Routes;
