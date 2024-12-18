import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Link,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router";
import useSWR from "swr";
import { getAuthFetcher } from "../fetcher";
import AuthContext from "../contexts/auth-context";
import TitleCard from "../components/TitleCard";
import PageLoader from "../components/PageLoader";

const TitlePage = () => {
  const [title, setTitle] = useState(null);

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const params = useParams();

  const { data, isLoading, error } = useSWR(
    `/titles/${params.id}`,
    getAuthFetcher(token)
  );
  const { data: activity } = useSWR(
    title ? `/activities/${title.activity}` : null,
    getAuthFetcher(token)
  );

  useEffect(() => {
    if (data) {
      setTitle({
        name: data.name,
        description: data.description,
        startDate: data.start_date,
        endDate: data.end_date,
        image: data.image,
        activity: data.activity,
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error]);

  if (isLoading || !title) return <PageLoader />;

  return (
    <Stack
      justifyContent={"center"}
      justifyItems={"center"}
      alignContent={"center"}
      paddingX={4}
    >
      <TitleCard title={title} activity={activity} />
    </Stack>
  );
};

export default TitlePage;
