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
        <Paper>
          <Tooltip
            title={
              hideCalculatedOrders
                ? "Hiding calculated orders"
                : "Showing calculated orders"
            }
          >
            <ToggleButton
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
        </Paper>
        <Box sx={{ color: red[700] }}>
          {hideCalculatedOrders && "Hiding calculated orders"}
        </Box>
      </Box>
    </Box>
  );
};
export { OrdersTableFilters };
