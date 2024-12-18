import {
  Box,
  Typography,
  Card,
  CardMedia,
  Link,
  CircularProgress,
  CardContent,
} from "@mui/material";

const TitleCard = ({ title, activity }) => {
  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          padding={2}
          sx={{ flexDirection: { xs: "column", sm: "row" }, gap: { xs: 3 } }}
        >
          {title.image && (
            <Card sx={{ width: 300 }}>
              <CardMedia
                component="img"
                height="400"
                image={title.image}
                alt={title.name}
              />
            </Card>
          )}

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
        </Box>
      </CardContent>
    </Card>
  );
};

export default TitleCard;
