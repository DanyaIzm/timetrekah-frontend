import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  Snackbar,
  Alert,
  FormControl,
  CircularProgress,
  Box,
  Container,
} from "@mui/material";
import AuthContext from "../contexts/auth-context";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useSWRMutation from "swr/mutation";
import {
  getAuthFetcher,
  getAuthMutateFetcher,
  getAuthMutateFetcherRaw,
  getAuthUpdateFetcher,
} from "../fetcher";
import useSWR from "swr";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate, useParams } from "react-router";
import PageLoader from "../components/PageLoader";
import dayjs from "dayjs";

const TitleEditPage = () => {
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

  const params = useParams();

  const titleId = params.id;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const { data: initialTitleData, isLoading } = useSWR(
    `/titles/${titleId}`,
    getAuthFetcher(token)
  );
  const { trigger, error } = useSWRMutation(
    "/titles/",
    getAuthUpdateFetcher(token)
  );
  const { trigger: triggerImage, error: errorImage } = useSWRMutation(
    "/images/",
    getAuthMutateFetcherRaw(token)
  );
  const { data: activities, isLoading: isActivityLoading } = useSWR(
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    navigate(`/titles/${titleId}`);
  };

  useEffect(() => {
    if (error) {
      Object.entries(error.info).forEach(([key, value]) => {
        errorMapping[key](value);
      });
    }
  }, [error]);

  useEffect(() => {
    if (initialTitleData) {
      setName(initialTitleData.name);
      setDescription(initialTitleData.description);
      setStartDate(dayjs(initialTitleData.start_date));
      setEndDate(dayjs(initialTitleData.end_date));
      setImage(initialTitleData.image);
      setActivityId(initialTitleData.activity);
    }
  }, [initialTitleData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const titleData = {
      id: titleId,
      name: name,
      description: description,
      start_date: startDate?.format("YYYY-MM-DD"),
      end_date: endDate ? endDate.format("YYYY-MM-DD") : null,
      activity: activityId,
    };

    console.log("datatoo", titleData);

    if (image) {
      titleData.image = image.id;
    }

    await trigger(titleData);

    setSnackbarOpen(true);
  };

  if (isLoading || isActivityLoading) {
    return <PageLoader />;
  }

  console.log("sd", startDate);
  console.log("ed", endDate);

  return (
    <Container maxWidth={"sm"}>
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
          Title is successfully updated! Redirecting...
        </Alert>
      </Snackbar>
      <Typography variant="h4" gutterBottom>
        Edit Title
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
            field: {
              clearable: true,
            },
            actionBar: {
              actions: ["clear", "cancel", "accept"],
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
            field: {
              clearable: true,
            },
            actionBar: {
              actions: ["clear", "cancel", "accept"],
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
          Update Title
        </Button>
      </form>
    </Container>
  );
};

export default TitleEditPage;
