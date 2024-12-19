import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Link,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid2,
  IconButton,
} from "@mui/material";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import translateMsToDays from "../utils/ms-to-days";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { getAuthDestroyFetcher } from "../fetcher";
import useSWRMutation from "swr/mutation";
import AuthContext from "../contexts/auth-context";
import { mutate } from "swr";

const TitleCard = ({ title, activity }) => {
  const [deleteDialogActive, setDeleteDialogActive] = useState(false);

  const { token } = useContext(AuthContext);
  const { trigger } = useSWRMutation("/titles/", getAuthDestroyFetcher(token));
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setDeleteDialogActive(true);
  };

  const handleCloseDialog = () => {
    setDeleteDialogActive(false);
  };

  const handleConfirmDelete = async () => {
    console.log(`Deleting title with id: ${title.id}`);
    await trigger(title.id);
    await mutate(
      (key) => typeof key === "string" && key.startsWith("/titles/")
    );
    setDeleteDialogActive(false);
  };

  const handleEditClick = () => {
    navigate(`/edit-title/${title.id}`);
  };

  return (
    <>
      <Dialog open={deleteDialogActive} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this title?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardContent>
          <Grid2 container>
            {title.image && (
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Card>
                  <CardMedia
                    sx={{
                      height: { xs: "300px", lg: "400px" },
                      objectFit: "cover",
                    }}
                    component="img"
                    image={title.image}
                    alt={title.name}
                  />
                </Card>
              </Grid2>
            )}

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Box sx={{ marginLeft: title.image ? 2 : 0 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {title.name}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ marginBottom: "16px" }}
                >
                  {title.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Start Date: {new Date(title.startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  End Date:{" "}
                  {title.endDate
                    ? new Date(title.endDate).toLocaleDateString()
                    : "Not finished yet"}
                </Typography>
                {title.endDate && (
                  <Typography variant="body2" color="textSecondary">
                    Spent:{" "}
                    {translateMsToDays(
                      new Date(title.endDate) - new Date(title.startDate)
                    )}{" "}
                    days
                  </Typography>
                )}
                {activity ? (
                  <Link
                    component={NavLink}
                    to={`/activities/${activity.id}`}
                    variant="body2"
                  >
                    {activity.name}
                  </Link>
                ) : (
                  <CircularProgress size="1rem" />
                )}
              </Box>
            </Grid2>
          </Grid2>
        </CardContent>
        <Box
          sx={{ padding: 1 }}
          display={"flex"}
          alignItems={"flex-start"}
          flexDirection={"column"}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(activity.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(activity.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    </>
  );
};

export default TitleCard;
