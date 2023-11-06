import { Box, Paper, ToggleButton, Tooltip } from "@mui/material";
import { useOrdersTableFiltersStore } from "./OrdersTableFiltersStore";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { red } from "@mui/material/colors";
const OrdersTableFilters = () => {
  const { hideCalculatedOrders, changeHideCalculatedOrders } =
    useOrdersTableFiltersStore();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Paper
          sx={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            padding: "0.2rem",
          }}
        >
          <Tooltip
            title={
              hideCalculatedOrders
                ? "Hiding calculated orders"
                : "Showing calculated orders"
            }
          >
            <ToggleButton
              size="small"
              value="left"
              aria-label="left aligned"
              onClick={changeHideCalculatedOrders}
            >
              {hideCalculatedOrders ? (
                <VisibilityOffIcon />
              ) : (
                <VisibilityIcon />
              )}
            </ToggleButton>
          </Tooltip>
          {hideCalculatedOrders && (
            <Box sx={{ color: red[700], fontSize: "14px" }}>
              Hiding calculated orders
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};
export { OrdersTableFilters };
