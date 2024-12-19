import React, { useContext, useEffect, useState } from "react";
import {
  CircularProgress,
  Grid,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router";
import useSWR from "swr";
import { getAuthFetcher } from "../fetcher";
import AuthContext from "../contexts/auth-context";
import TitleCard from "../components/TitleCard";
import PageLoader from "../components/PageLoader";
import { Link } from "react-router-dom";

const ActivityPage = () => {
  const [activity, setActivity] = useState(null);
  const [titles, setTitles] = useState(null);

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const params = useParams();

  const { data, isLoading, error } = useSWR(
    `/activities/${params.id}`,
    getAuthFetcher(token)
  );
  const { data: titlesData } = useSWR(
    activity ? `/titles/?activity=${activity.id}` : null,
    getAuthFetcher(token)
  );

  console.log(data);

  useEffect(() => {
    if (data) {
      setActivity({
        id: data.id,
        name: data.name,
        description: data.description,
      });
    }
  }, [data]);

  useEffect(() => {
    if (titlesData) {
      setTitles(
        titlesData.map((title) => {
          return {
            id: title.id,
            name: title.name,
            description: title.description,
            startDate: title.start_date,
            endDate: title.end_date,
            image: title.image,
          };
        })
      );
    }
  }, [titlesData]);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error]);

  if (isLoading || !activity) return <PageLoader />;

  console.log(titles);

  return (
    <Stack
      justifyContent={"center"}
      justifyItems={"center"}
      alignContent={"center"}
      paddingX={4}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {activity.name}
      </Typography>
      <Typography variant="body1" component="p" sx={{ marginBottom: "16px" }}>
        {activity.description}
      </Typography>
      {titles && (
        <Grid2 container spacing={2} marginTop={2}>
          {titles.map((title) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={title.id}>
              <TitleCard activity={activity} title={title} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Stack>
  );
};

export default ActivityPage;
