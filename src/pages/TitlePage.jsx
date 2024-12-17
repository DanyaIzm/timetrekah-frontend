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

  if (isLoading || !title) return <CircularProgress />;

  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      justifyItems={"center"}
      alignContent={"center"}
      padding={4}
    >
      <Box display="flex" padding={2}>
        {title.image && (
          <Card sx={{ width: 300 }}>
            <CardMedia
              component="img"
              height="400"
              image={title.image}
              alt={title.name}
            />
          </Card>
        )}

        <Box sx={{ marginLeft: title.image ? 2 : 0 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title.name}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ marginBottom: "16px" }}
          >
            {title.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Start Date: {new Date(title.startDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            End Date:{" "}
            {title.endDate
              ? new Date(title.endDate).toLocaleDateString()
              : "Not finished yet"}
          </Typography>
          <Link href={`/activities/${title.activity}`} variant="body2">
            {activity ? activity.name : <CircularProgress size="1rem" />}
          </Link>
        </Box>
      </Box>
    </Stack>
  );
};

export default TitlePage;
