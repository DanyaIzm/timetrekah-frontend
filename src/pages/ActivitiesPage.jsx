import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AuthContext from "../contexts/auth-context";
import { getAuthDestroyFetcher, getAuthFetcher } from "../fetcher";
import useSWR from "swr";
import PageLoader from "../components/PageLoader";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useSWRMutation from "swr/mutation";

const ActivitiesPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deleteDialogActive, setDeleteDialogActive] = useState(false);
  const [currentDeleteCandidateId, setCurrentDeleteCandidateId] =
    useState(null);

  const { data: activities, isLoading } = useSWR(
    "/activities/",
    getAuthFetcher(token)
  );
  const { trigger } = useSWRMutation(
    "/activities/",
    getAuthDestroyFetcher(token)
  );

  const handleDeleteClick = (activityId) => {
    setDeleteDialogActive(true);
    setCurrentDeleteCandidateId(activityId);
  };

  const handleCloseDialog = () => {
    setDeleteDialogActive(false);
    setCurrentDeleteCandidateId(null);
  };

  const handleConfirmDelete = async () => {
    console.log(`Deleting activity with id: ${currentDeleteCandidateId}`);
    await trigger(currentDeleteCandidateId);
    setDeleteDialogActive(false);
    setCurrentDeleteCandidateId(null);
  };

  const handleEditClick = (activityId) => {
    navigate(`/edit-activity/${activityId}`);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Dialog open={deleteDialogActive} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this activity?
          </Typography>
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
      <Grid2 container spacing={2} sx={{ padding: 2 }}>
        {activities.map((activity) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }} key={activity.id}>
            <Card
              sx={{
                minHeight: { xs: "100px", sm: "180px" },
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {activity.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {activity.description}
                </Typography>
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
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default ActivitiesPage;
