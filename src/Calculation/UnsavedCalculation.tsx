import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useCalculationStore } from "./CalculationStore";

const ordersColumns = [
  { field: "id", headerName: "Order ID's", width: 50, flex: 1 },
  { field: "invoiceNumber", headerName: "Invoice", width: 100, flex: 1 },
  { field: "customerName", headerName: "Customer", width: 50, flex: 1 },
];
const productTallyColumns = [
  { field: "id", headerName: "id", width: 300 },
  { field: "productName", headerName: "Product", width: 300 },
  { field: "hasRecipe", headerName: "Has Recipe", width: 100 },
  { field: "amountOrdered", headerName: "Amount", width: 150 },
];

const beansTallyColumns = [
  { field: "id", headerName: "id", width: 200 },
  { field: "beanName", headerName: "Bean", width: 200 },
  {
    field: "amountNeededToBeRoasted",
    headerName: "Amount (kg)",
    width: 150,
    renderCell: (
      params: GridRenderCellParams<
        unknown,
        {
          id: number;
          beanName?: string | undefined;
          amountNeededToBeRoasted?: number | undefined;
        }
      >
    ) => {
      console.log(params.row);
      return (
        <>
          {params.row.amountNeededToBeRoasted &&
            params.row.amountNeededToBeRoasted / 100}
          g
        </>
      );
    },
  },
];
const UnsavedCalculation = () => {
  const { calculation } = useCalculationStore();
  return (
    <Box
      sx={{
        flexGrow: "1",
        display: "flex",
        gap: "1rem",
        justifyContent: "space-",
      }}
    >
      <DataGrid
        sx={{ width: "20rem" }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        rows={calculation ? calculation?.ordersCalculatedInformation : []}
        columns={ordersColumns}
        checkboxSelection
        disableSelectionOnClick
        density="compact"
      />
      <DataGrid
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        rows={calculation ? calculation.beansTally : []}
        columns={beansTallyColumns}
        checkboxSelection
        disableSelectionOnClick
        density="compact"
      />
      <DataGrid
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        rows={calculation ? calculation.productsTally : []}
        columns={productTallyColumns}
        checkboxSelection
        disableSelectionOnClick
        density="compact"
      />
    </Box>
  );
};
export { UnsavedCalculation };
