import { Outlet } from "react-router";
import Header from "../components/Header";
import { Box } from "@mui/material";

const PageWrapper = () => {
  return (
    <>
      <Header
        isLoggedIn={true}
        onLogin={() => {
          console.log("login");
        }}
        onLogout={() => console.log("logout")}
      />
      <Box marginTop={4}>
        <Outlet />
      </Box>
    </>
  );
};

export default PageWrapper;
