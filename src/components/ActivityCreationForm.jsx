import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import useSWRMutation from "swr/mutation";
import { getAuthMutateFetcher } from "../fetcher";
import AuthContext from "../contexts/auth-context";

const ActivityCreationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const { token } = useContext(AuthContext);
  const { trigger, error } = useSWRMutation(
    "/activities/",
    getAuthMutateFetcher(token)
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const activityData = { name, description };

    await trigger(activityData);
  };

  const errorMapping = {
    name: (err) => {
      setNameError(err);
    },
    description: (err) => {
      setDescriptionError(setPasswordErrorMessage, err);
    },
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
