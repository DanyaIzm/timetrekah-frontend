import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f5f5f5", // Light background color
        padding: "20px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
        borderRadius: "8px", // Rounded corners
        margin: "0 20px", // Margin for responsiveness
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#DC143C" }}
      >
        Oops! An Error Occurred
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ color: "#555" }}>
        Maybe it was you or maybe something is wrong
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={goToMainPage}
        sx={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Button shadow
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)", // Darker shadow on hover
          },
        }}
      >
        Go to Main Page
      </Button>
    </Box>
  );
};

export default ErrorPage;
