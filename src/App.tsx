import { Box } from "@mui/material";
import { Orders } from "./Orders/Orders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { grey } from "@mui/material/colors";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Box sx={{ display: "flex", bgcolor: grey[200] }}>
          <Box sx={{ height: "100vh", width: "10rem", bgcolor: grey[900] }}>
            <Box
              sx={{
                textAlign: "center",
                color: "white",
                mt: "1rem",
                fontSize: "16px",
              }}
            >
              GLITCHHUB
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              flexGrow: "1",
              gap: "1rem",
            }}
          >
            <Orders />
          </Box>
        </Box>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      </QueryClientProvider>
    </>
  );
}
