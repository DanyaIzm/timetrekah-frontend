import { Card, CardContent, Grid2, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AuthContext from "../contexts/auth-context";
import { getAuthFetcher } from "../fetcher";
import useSWR from "swr";
import PageLoader from "../components/PageLoader";
import { useNavigate } from "react-router";

const ActivitiesPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: activities, isLoading } = useSWR(
    "/activities/",
    getAuthFetcher(token)
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Grid2 container spacing={2} sx={{ padding: 2 }}>
      {activities.map((activity) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }} key={activity.id}>
          <Card
            sx={{ minHeight: { xs: "100px", sm: "180px" }, cursor: "pointer" }}
            onClick={() => navigate(`/activities/${activity.id}`)}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {activity.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ActivitiesPage;
