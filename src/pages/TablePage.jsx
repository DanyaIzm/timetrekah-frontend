import { useContext, useMemo, useState } from "react";
import AuthContext from "../contexts/auth-context";
import useSWR from "swr";
import { getAuthFetcher } from "../fetcher";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import translateMsToDays from "../utils/ms-to-days";

const TablePage = () => {
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

  console.log("act", activitiesData);
  console.log("titles", titlesData);

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

  console.log("twa", titlesWithActivities);

  if (activitiesAreLoading || titlesAreLoading) {
    return <CircularProgress />;
  }

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <Box display={"flex"}>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <>
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

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
              <TableCell align="center">Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {titlesWithActivities.map((activity) => (
              <>
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{title.name}</TableCell>
                    <TableCell align="center">{title.description}</TableCell>
                    <TableCell align="center">
                      <img src={title.image} width="180px" />
                    </TableCell>
                    <TableCell align="center">{title["start_date"]}</TableCell>
                    <TableCell align="center">{title["end_date"]}</TableCell>
                    <TableCell align="center">{title["time_spent"]}</TableCell>
                    <TableCell align="center">{title.activity}</TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TablePage;
