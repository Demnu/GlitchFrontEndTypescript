import { Box, Chip } from "@mui/material";
import Divider from "@mui/material/Divider";
import AdsClickIcon from "@mui/icons-material/AdsClick";
const OrdersLegend = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        py: "1rem",
        pl: "1rem",
      }}
    >
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Chip variant="outlined" label="Coffee Cups" />
        <Box sx={{ fontSize: "14px" }}>No recipe</Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Chip variant="outlined" color="primary" label="Haywire Blend" />
        <Box sx={{ fontSize: "14px" }}>Has recipe</Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Chip variant="outlined" color="warning" label="Santa Rita" />
        <Box sx={{ fontSize: "14px" }}>Possibly needs recipe</Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Chip variant="filled" color="primary" label="Haywire Blend" />
        <AdsClickIcon />
        <Box sx={{ fontSize: "14px" }}>Click to see information</Box>
      </Box>
      <Divider orientation="vertical" flexItem />
    </Box>
  );
};
export { OrdersLegend };
