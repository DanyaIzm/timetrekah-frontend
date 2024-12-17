import { CircularProgress, Stack } from "@mui/material";

const PageLoader = () => {
  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      justifyItems={"center"}
      alignContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <CircularProgress />
    </Stack>
  );
};

export default PageLoader;
