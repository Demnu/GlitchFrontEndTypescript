import { NavLink } from "react-router-dom";
import { useDashboardLayoutStore } from "./DashboardLayoutStore";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SvgIconComponent } from "@mui/icons-material";
import { isMobile } from "../utils/isMobile";

interface SideDrawLinkProps {
  link: string;
  Icon: SvgIconComponent;
  title: string;
}
const SideDrawerLink = (props: SideDrawLinkProps) => {
  const { drawerState, setDrawerState, setTopBarTitle } =
    useDashboardLayoutStore();

  const { link, title, Icon } = props;
  return (
    <NavLink
      onClick={() => {
        if (isMobile()) {
          setDrawerState("closed");
        }
        if (title != "Logout") {
          setTopBarTitle(title);
        }
      }}
      to={link}
      unstable_viewTransition
    >
      {({ isActive }) => (
        <Box
          sx={{
            height: "3rem",
            display: "flex",
            alignItems: "center",
            color: "white",
            fontSize: "19px",
            gap: "1rem",
            bgcolor: isActive ? grey[700] : "-moz-initial",
            pl: "1.1rem",
            "&:hover": {
              bgcolor: isActive ? grey[700] : grey[800], // Only apply hover effect if not active
            },
          }}
        >
          <Icon />
          {drawerState === "open" && title}
        </Box>
      )}
    </NavLink>
  );
};
export { SideDrawerLink };
