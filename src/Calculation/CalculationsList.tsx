import { Box } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { api } from "../myApi";
import { SavedCalculation } from "../../glitchHubApi";

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
    renderCell: (params: GridRenderCellParams<unknown, SavedCalculation>) => {
      return <>{new Date(params.row.createdAt).toLocaleDateString()}</>;
    },
  },
  { field: "author", headerName: "Author", width: 100, flex: 1 },
];

const CalculationsList = () => {
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
        rows={!isLoading ? calculations : []}
        columns={calculationsColumns}
        disableSelectionOnClick
        density="compact"
      />
    </Box>
  );
};
export { CalculationsList };
