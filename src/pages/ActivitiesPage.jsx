import { useContext } from "react";
import AuthContext from "../contexts/auth-context";
import useSWR from "swr";
import { getAuthFetcher } from "../fetcher";
import { CircularProgress } from "@mui/material";

const ActivitiesPage = () => {
  const { token } = useContext(AuthContext);
  const { data, error, isLoading } = useSWR(
    "/activities",
    getAuthFetcher(token)
  );

  console.log("new Cycle");

  console.log(data);
  console.log(error);
  console.log(isLoading);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      {data.map((activity) => (
        <div key={activity.id}>
          {activity.name}, desc: {activity.description}
        </div>
      ))}
    </>
  );
};

export default ActivitiesPage;
