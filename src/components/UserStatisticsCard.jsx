import React from "react";
import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";

const UserStatisticsCard = ({ stats }) => {
  const { total_average, total_activity_days, activities_stats } = stats;

  console.log("statoos", activities_stats);

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          User Statistics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Average: {total_average ? total_average.toFixed(2) : "No data"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Activity Days: {total_activity_days || "No data"}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {/* TODO: Refactor this to isEmpty method */}
        {Object.keys(activities_stats).length !== 0 ? (
          <>
            <Typography variant="h6" component="div">
              Activities Stats
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(activities_stats).map(([activity, data]) => (
                <Grid item xs={12} sm={12} md={6} xl={4} key={activity}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{activity}</Typography>
                      <Typography variant="body2">
                        Days Spent: {data.days_spent || "No data"}
                      </Typography>
                      <Typography variant="body2">
                        Average Title Duration:{" "}
                        {data.average_title_duration !== null
                          ? data.average_title_duration
                          : "No data"}
                      </Typography>
                      <Typography variant="body2">
                        Least Long Lasting Days:{" "}
                        {data.least_long_lasting_days !== null
                          ? data.least_long_lasting_days
                          : "No data"}
                      </Typography>
                      <Typography variant="body2">
                        Least Long Lasting Name:{" "}
                        {data.least_long_lasting_name || "No data"}
                      </Typography>
                      <Typography variant="body2">
                        Most Long Lasting Days:{" "}
                        {data.most_long_lasting_days !== null
                          ? data.most_long_lasting_days
                          : "No data"}
                      </Typography>
                      <Typography variant="body2">
                        Most Long Lasting Name:{" "}
                        {data.most_long_lasting_name || "No data"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Typography variant="h6" component="div">
            Sorry, you have no stats
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default UserStatisticsCard;
