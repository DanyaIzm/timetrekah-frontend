import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const TitleCreationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);
  const [activityId, setActivityId] = useState("");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities for the select dropdown
    const fetchActivities = async () => {
      try {
        const response = await fetch("YOUR_ACTIVITY_API_ENDPOINT_HERE");
        const data = await response.json();
        setActivities(data); // Assuming the response is an array of activities
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("image", image);
    formData.append("activity_id", activityId);

    try {
      const response = await fetch("YOUR_TITLE_API_ENDPOINT_HERE", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Title created successfully");
        // Reset form fields
        setName("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setImage(null);
        setActivityId("");
      } else {
        console.error("Failed to create title");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
          required
        />
        <TextField
          label="Start Date"
          type="datetime-local"
          variant="outlined"
          fullWidth
          margin="normal"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <TextField
          label="End Date"
          type="datetime-local"
          variant="outlined"
          fullWidth
          margin="normal"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span" fullWidth>
            Upload Image
          </Button>
        </label>
        {image && <Typography variant="body2">{image.name}</Typography>}
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="activity-select-label">Activity</InputLabel>
          <Select
            labelId="activity-select-label"
            value={activityId}
            onChange={(e) => setActivityId(e.target.value)}
          >
            {activities.map((activity) => (
              <MenuItem key={activity.id} value={activity.id}>
                {activity.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Title
        </Button>
      </form>
    </>
  );
};

export default TitleCreationForm;
