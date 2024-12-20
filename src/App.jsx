import { useContext, useState } from "react";
import viteLogo from "/logo.png";
import { Button, Stack, Typography } from "@mui/material";
import AuthContext from "./contexts/auth-context";
import useUser from "./hooks/use-user";
import UserStatisticsCard from "./components/UserStatisticsCard";
import useSWR from "swr";
import { getAuthFetcher } from "./fetcher";
import PageLoader from "./components/PageLoader";

function App() {
  const [count, setCount] = useState(0);

  const { token } = useContext(AuthContext);
  const { user } = useUser();

  const { data: userStats, isLoading } = useSWR(
    "/stats/",
    getAuthFetcher(token)
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Stack
      justifyContent={"center"}
      justifyItems={"center"}
      alignContent={"center"}
      alignItems={"center"}
      paddingX={4}
      paddingTop={12}
    >
      <Typography variant="h1" sx={{ marginBottom: 4 }}>
        Welcome, {user.username}
      </Typography>
      <UserStatisticsCard stats={userStats} />
    </Stack>
  );
}

export default App;
