import { ReactElement } from "react";

import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { grey } from "@mui/material/colors";
import { TopBar } from "./TopBar";
import { SideDrawer } from "./SideDrawer";
import { VIEW_HEIGHT } from "./dashboardLayoutConstants";
interface AppProps {
  children: ReactElement;
}

export default function App(props: AppProps) {
  const { children } = props;
  const queryClient = new QueryClient();
  // Styles for the drawer

  return (
    <>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
}
