import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SWRConfig } from "swr";
import { fetcher } from "./fetcher.js";
import AuthContext from "./contexts/auth-context.js";
import useAuthContext from "./hooks/use-auth-context.js";
import Routes from "./routes/Routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/de";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <Routes />
      </LocalizationProvider>
    </SWRConfig>
  </StrictMode>
);
