import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Box,
} from "@mui/material";
import AuthContext from "../contexts/auth-context";
import useSWRMutation from "swr/mutation";
import {
  getAuthFetcher,
  getAuthMutateFetcher,
  getAuthMutateFetcherRaw,
} from "../fetcher";
import useSWR from "swr";
import { DatePicker } from "@mui/x-date-pickers";

const TitleCreationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [image, setImage] = useState(null);
  const [activityId, setActivityId] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [activityError, setActivityError] = useState("");

  const { token } = useContext(AuthContext);
  const { trigger, error } = useSWRMutation(
    "/titles/",
    getAuthMutateFetcher(token)
  );
  const { trigger: triggerImage, error: errorImage } = useSWRMutation(
    "/images/",
    getAuthMutateFetcherRaw(token)
  );
  const { data: activities, isLoading } = useSWR(
    "/activities/",
    getAuthFetcher(token)
  );

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);

    const res = await triggerImage(formData);

    setImage(res);

    console.log(res);
  };

  const errorMapping = {
    name: (err) => {
      setNameError(err);
    },
    description: (err) => {
      setDescriptionError(setPasswordErrorMessage, err);
    },
    start_date: (err) => {
      setStartDateError(err);
    },
    end_date: (err) => {
      setEndDateError(err);
    },
    activity: (err) => {
      setActivityError(err);
    },
  };

  useEffect(() => {
    if (error) {
      console.log(error.info);

      Object.entries(error.info).forEach(([key, value]) => {
        errorMapping[key](value);
      });
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const titleData = {
      name: name,
      description: description,
      start_date: startDate?.format("YYYY-MM-DD"),
      end_date: endDate?.format("YYYY-MM-DD"),
      image: image.id,
      activity: activityId,
    };

    console.log(titleData);

    await trigger(titleData);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create Title
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title Name"
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
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          slotProps={{
            textField: {
              margin: "normal",
              fullWidth: true,
              variant: "outlined",
              error: !!startDateError,
              helperText: startDateError,
            },
          }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          error={!!endDateError}
          helperText={endDateError}
          slotProps={{
            textField: {
              margin: "normal",
              fullWidth: true,
              variant: "outlined",
              error: !!endDateError,
              helperText: endDateError,
            },
          }}
        />
        <FormControl fullWidth margin="normal" error={!!activityError}>
          <InputLabel id="activity-select-label">Activity</InputLabel>
          <Select
            label="Activity"
            labelId="activity-select-label"
            value={activityId}
            onChange={(e) => setActivityId(e.target.value)}
            required
          >
            {activities.map((activity) => (
              <MenuItem key={activity.id} value={activity.id}>
                {activity.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          type="file"
          onChange={(e) => uploadImage(e.target.files[0])}
        />
        <label htmlFor="image-upload">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            sx={{ marginY: "16px" }}
          >
            Upload Image
          </Button>
        </label>
        {image && (
          <Box display={"flex"} justifyContent={"center"} margin={"8px"}>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src={image.file}
            />
          </Box>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Title
        </Button>
      </form>
    </>
  );
};

export default TitleCreationForm;
