import React, { useContext, useMemo } from "react";
import AuthContext from "../contexts/auth-context";
import useSWR from "swr";
import { getAuthFetcher } from "../fetcher";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import translateMsToDays from "../utils/ms-to-days";
import PageLoader from "../components/PageLoader";

const TablePage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const { token } = useContext(AuthContext);
  const {
    data: activitiesData,
    isLoading: activitiesAreLoading,
    error: activitiesError,
  } = useSWR("/activities", getAuthFetcher(token));
  const {
    data: titlesData,
    isLoading: titlesAreLoading,
    error: titlesError,
  } = useSWR("/titles", getAuthFetcher(token));

  const titlesWithActivities = useMemo(() => {
    if (!activitiesData || !titlesData) {
      return [];
    }

    const data = activitiesData.map((activity) => {
      return {
        ...activity,
        titles: titlesData
          .filter((title) => title.activity === activity.id)
          .map((title) => {
            return {
              ...title,
              start_date: new Date(title.start_date).toLocaleDateString(),
              end_date: title.end_date
                ? new Date(title.end_date).toLocaleDateString()
                : "No date",
              time_spent: title.end_date
                ? translateMsToDays(
                    new Date(title.end_date) - new Date(title.start_date)
                  )
                : "Not finished",
            };
          }),
      };
    });

    return data;
  }, [titlesData, activitiesData]);

  if (activitiesAreLoading || titlesAreLoading) {
    return <PageLoader />;
  }

  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      justifyItems={"center"}
      alignContent={"center"}
      alignItems={"center"}
    >
      {isMobile ? (
        titlesWithActivities.map((activity) => (
          <Box key={activity.id} sx={{ width: "100%", marginBottom: 2 }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" color="primary">
                {activity.name}
              </Typography>
              {activity.titles.map((title) => (
                <Box
                  key={title.id}
                  sx={{ marginBottom: 1, padding: 1, border: "1px solid #ccc" }}
                >
                  <Typography variant="body1">
                    <strong>Name:</strong> {title.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Description:</strong> {title.description}
                  </Typography>
                  <img
                    src={title.image}
                    width="100%"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                  <Typography variant="body2">
                    <strong>Start date:</strong> {title["start_date"]}
                  </Typography>
                  <Typography variant="body2">
                    <strong>End date:</strong> {title["end_date"]}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Days Spent:</strong> {title["time_spent"]}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Box>
        ))
      ) : (
        <Box display={"flex"}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Start date</TableCell>
                  <TableCell align="center">End date</TableCell>
                  <TableCell align="center">Days Spent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {titlesWithActivities.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <TableRow
                      key={activity.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ backgroundColor: "black" }}
                    >
                      <TableCell
                        colSpan={7}
                        align="center"
                        style={{ fontWeight: "bold", color: "white" }}
                      >
                        {activity.name}
                      </TableCell>
                    </TableRow>
                    {activity.titles.map((title) => (
                      <TableRow
                        key={title.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{title.name}</TableCell>
                        <TableCell align="center">
                          {title.description}
                        </TableCell>
                        <TableCell align="center">
                          <img src={title.image} width="180px" />
                        </TableCell>
                        <TableCell align="center">
                          {title["start_date"]}
                        </TableCell>
                        <TableCell align="center">
                          {title["end_date"]}
                        </TableCell>
                        <TableCell align="center">
                          {title["time_spent"]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Stack>
  );
};

export default TablePage;
