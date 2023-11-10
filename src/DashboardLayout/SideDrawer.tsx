import { Box } from "@mui/material";
import { VIEW_HEIGHT, openCloseTransition } from "./dashboardLayoutConstants";
import { grey } from "@mui/material/colors";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useDashboardLayoutStore } from "./DashboardLayoutStore";
import { SideDrawerLink } from "./SideDrawerLink";

const SideDrawer = () => {
  const { currentDrawerWidth } = useDashboardLayoutStore();

  return (
    <Box
      sx={{
        height: VIEW_HEIGHT, // Subtracting 64px from 100vh
        width: currentDrawerWidth,
        bgcolor: grey[900],
        transition: openCloseTransition,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: currentDrawerWidth,
          transition: openCloseTransition,
        }}
      >
        <SideDrawerLink title="Orders" link="/orders" Icon={ReceiptIcon} />
        <SideDrawerLink title="Recipes" link="/recipes" Icon={MenuBookIcon} />
        <SideDrawerLink
          title="Calculations"
          link="/calculations"
          Icon={CalculateIcon}
        />
      </Box>
    </Box>
  );
};

export { SideDrawer };
