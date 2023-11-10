import { Box, IconButton, Paper, Typography } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import { openCloseTransition, topBarHeight } from "./dashboardLayoutConstants";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logowhite.png"; // Adjust the path to where your logo is saved
import { useDashboardLayoutStore } from "./DashboardLayoutStore";

const TopBar = () => {
  const { drawerState, setDrawerState, currentDrawerWidth, topBarTitle } =
    useDashboardLayoutStore();

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        width: "100vw",
        bgcolor: yellow[700],
        height: topBarHeight,
        alignItems: "center",
        position: "relative",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          width: currentDrawerWidth,
          height: topBarHeight,
          bgcolor: grey[900],
          display: "flex",
          alignContent: "center",
          px: "1.4rem",
          transition: openCloseTransition,
        }}
      >
        <IconButton
          sx={{ color: "white" }}
          aria-label="open drawer"
          edge="start"
          onClick={() =>
            setDrawerState(drawerState === "closed" ? "open" : "closed")
          }
        >
          <MenuIcon />
        </IconButton>
        {drawerState === "open" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: "0.4rem",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Glitchhub Logo"
              sx={{ height: "3rem", color: "white" }}
            />
          </Box>
        )}
      </Box>
      <Typography variant="h5" sx={{ transition: openCloseTransition }}>
        {topBarTitle}
      </Typography>
    </Paper>
  );
};

export { TopBar };
