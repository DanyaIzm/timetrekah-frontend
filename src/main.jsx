import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { SWRConfig } from "swr";
import { fetcher } from "./fetcher.js";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <RouterProvider router={router} />
    </SWRConfig>
  </StrictMode>
);
