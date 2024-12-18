import { useContext, useState } from "react";
import viteLogo from "/logo.png";
import { Button, Stack, Typography } from "@mui/material";
import AuthContext from "./contexts/auth-context";
import useUser from "./hooks/use-user";

function App() {
  const [count, setCount] = useState(0);

  const { user } = useUser();
  const { logout } = useContext(AuthContext);

  return (
    <Stack
      justifyContent={"center"}
      justifyItems={"center"}
      alignContent={"center"}
      alignItems={"center"}
      paddingX={4}
      paddingTop={12}
    >
      <Typography variant="h1">Welcome, {user.username}</Typography>
    </Stack>
  );
}

export default App;
