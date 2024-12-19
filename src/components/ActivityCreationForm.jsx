import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import useSWRMutation from "swr/mutation";
import { getAuthMutateFetcher } from "../fetcher";
import AuthContext from "../contexts/auth-context";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router";

const ActivityCreationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [activityId, setActivityId] = useState(null);

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const { trigger, error } = useSWRMutation(
    "/activities/",
    getAuthMutateFetcher(token)
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const activityData = { name, description };

    const result = await trigger(activityData);

    setActivityId(result.id);
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

  return (
    <>
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
          Activity is successfully created! Redirecting...
        </Alert>
      </Snackbar>
      <Typography variant="h4" gutterBottom>
        Create Activity
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
            Create Activity
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ActivityCreationForm;
