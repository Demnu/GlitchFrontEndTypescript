import { Box } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { api } from "../myApi";
import { SavedCalculationDto } from "../../glitchHubApi";
import { useViewNavigate } from "../hooks/useViewNavigate";
import { CALCULATIONS_PAGE_INFO, createRouteInfo } from "../routeStrings";
import { useNavigate } from "react-router-dom";

const fetchCalculations = () => {
  return api.calculations
    .listCalculationsList()
    .then((response) => response.data);
};

const calculationsColumns = [
  { field: "id", headerName: "Order ID's", width: 50, flex: 1 },
  { field: "calculationName", headerName: "Calculation", width: 50, flex: 1 },
  {
    field: "createdAt",
    headerName: "Created on",
    width: 50,
    flex: 1,
    renderCell: (
      params: GridRenderCellParams<unknown, SavedCalculationDto>
    ) => {
      return <>{new Date(params.row.createdAt).toLocaleDateString()}</>;
    },
  },
  { field: "author", headerName: "Author", width: 100, flex: 1 },
];

const CalculationsList = () => {
  const viewNavigate = useViewNavigate();

  const { data: calculations, isLoading } = useQuery(["calculations"], () =>
    fetchCalculations()
  );

  return (
    <Box sx={{ display: "flex", flexGrow: "1" }}>
      <DataGrid
        loading={!calculations}
        sx={{ width: "20rem", bgcolor: "white" }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        onRowClick={(params) => {
          viewNavigate(
            createRouteInfo("calculation/" + params.id, "Calculation")
          );
        }}
        rows={calculations ? calculations : []}
        columns={calculationsColumns}
        disableSelectionOnClick
        density="compact"
      />
    </Box>
  );
};
export { CalculationsList };
