import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url("/landing page image.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        px: 2,
        position: "relative",
        "::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 50, 0.6)", 
        },
        zIndex: 1,
      }}
    >
      <Box position="relative" zIndex={2}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Share Your Ideas Globally
        </Typography>
        <Typography variant="h6" gutterBottom>
          Publish and Inspire others.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
          <Button
            component={Link}
            to="/create"
            variant="contained"
            color="primary"
          >
            Start Writing
          </Button>
          <Button
            component={Link}
            to="/blogs"
            variant="outlined"
            sx={{ color: "#fff", borderColor: "#fff" }}
          >
            Explore Stories
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Landing;
