import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const ActivityCreationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const activityData = { name, description };

    try {
      const response = await fetch("YOUR_API_ENDPOINT_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activityData),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message, reset form, etc.)
        console.log("Activity created successfully");
        setName("");
        setDescription("");
      } else {
        // Handle error (e.g., show an error message)
        console.error("Failed to create activity");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
        <Button type="submit" variant="contained" color="primary">
          Create Activity
        </Button>
      </form>
    </>
  );
};

export default ActivityCreationForm;
