import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Container,
} from "@mui/material";
import useSWRMutation from "swr/mutation";
import {
  getAuthFetcher,
  getAuthMutateFetcher,
  getAuthUpdateFetcher,
} from "../fetcher";
import AuthContext from "../contexts/auth-context";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate, useParams } from "react-router";
import useSWR from "swr";
import PageLoader from "../components/PageLoader";

// TODO: refactor this and activity creation page!
const ActivityEditPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const params = useParams();

  const activityId = params.id;

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const { data: initialActivityData, isLoading } = useSWR(
    `/activities/${activityId}`,
    getAuthFetcher(token)
  );
  const { trigger, error } = useSWRMutation(
    "/activities/",
    getAuthUpdateFetcher(token)
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const activityData = { id: activityId, name, description };

    await trigger(activityData);

    setSnackbarOpen(true);
  };

  const errorMapping = {
    name: (err) => {
      setNameError(err);
    },
    description: (err) => {
      setDescriptionError(setPasswordErrorMessage, err);
    },
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    navigate(`/activities/${activityId}`);
  };

  useEffect(() => {
    if (error) {
      Object.entries(error.info).forEach(([key, value]) => {
        errorMapping[key](value);
      });
    }
  }, [error]);

  useEffect(() => {
    if (initialActivityData) {
      setName(initialActivityData.name);
      setDescription(initialActivityData.description);
    }
  }, [initialActivityData]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container maxWidth="sm">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ backgroundColor: "#4caf50", color: "white" }}
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" />,
          }}
        >
          Activity is successfully updated! Redirecting...
        </Alert>
      </Snackbar>
      <Typography variant="h4" gutterBottom>
        Edit Activity
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Activity Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!descriptionError}
          helperText={descriptionError}
        />
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button type="submit" variant="contained" color="primary">
            Edit Activity
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ActivityEditPage;
