import { ReactElement, useEffect } from "react";

import { Box } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { grey } from "@mui/material/colors";
import { TopBar } from "./TopBar";
import { SideDrawer } from "./SideDrawer";
import { VIEW_HEIGHT } from "./dashboardLayoutConstants";
import { useDashboardLayoutStore } from "./DashboardLayoutStore";
import { isMobile } from "../utils/isMobile";
interface AppProps {
  children: ReactElement;
}

export default function App(props: AppProps) {
  const { children } = props;
  const { refreshOnScreenSizeChange, setDrawerState } =
    useDashboardLayoutStore();
  useEffect(() => {
    const isMobileDevice = isMobile();
    if (isMobileDevice) {
      setDrawerState("closed");
    }
    const handleResize = () => {
      refreshOnScreenSizeChange();
    };

    window.addEventListener("resize", handleResize);

    // Initial check and setup
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <TopBar />
      <Box sx={{ display: "flex", bgcolor: grey[900] }}>
        {/* handle drawer */}
        <SideDrawer />
        <Box
          sx={{
            bgcolor: grey[200],
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            flexGrow: "1",
            gap: "1rem",
            height: VIEW_HEIGHT, // Subtracting 64px from 100vh
          }}
        >
          {children}
        </Box>
      </Box>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </>
  );
}
