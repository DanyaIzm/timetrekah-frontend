import {
  Box,
  Typography,
  Card,
  CardMedia,
  Link,
  CircularProgress,
  CardContent,
  Grid2,
} from "@mui/material";

const TitleCard = ({ title, activity }) => {
  return (
    <Card>
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
              <Link href={`/activities/${title.activity}`} variant="body2">
                {activity ? activity.name : <CircularProgress size="1rem" />}
              </Link>
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default TitleCard;
