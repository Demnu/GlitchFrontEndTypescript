import { Box, Chip } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Calculation } from "../../glitchHubApi";

interface ProductsTally {
  id: string;
  productName: string;
  amountOrdered: number;
  hasRecipe: boolean;
}
interface OrdersTally {
  id: string;
  invoiceNumber: string;
  createdAt: string;
  customerName: string;
}
interface BeansTally {
  id: number;
  beanName?: string;
  amountNeededToBeRoasted?: number;
}

const ordersColumns = [
  { field: "id", headerName: "Order ID's", width: 50, flex: 1 },
  { field: "invoiceNumber", headerName: "Invoice", width: 100, flex: 1 },
  { field: "customerName", headerName: "Customer", width: 50, flex: 1 },
  {
    field: "createdAt",
    headerName: "Order Date",
    width: 50,
    flex: 1,
    renderCell: (params: GridRenderCellParams<unknown, OrdersTally>) => {
      return <>{new Date(params.row.createdAt).toLocaleDateString()}</>;
    },
  },
];
const productTallyColumns = [
  { field: "id", headerName: "id", width: 300 },
  {
    field: "productName",
    headerName: "Product",
    width: 300,
    renderCell: (params: GridRenderCellParams<unknown, ProductsTally>) => {
      return (
        <Chip
          variant="outlined"
          label={params.row.productName}
          color={params.row.hasRecipe ? "primary" : "default"}
        />
      );
    },
  },
  { field: "amountOrdered", headerName: "Amount", width: 150 },
];

const beansTallyColumns = [
  { field: "id", headerName: "id", width: 200 },
  { field: "beanName", headerName: "Bean", width: 200 },
  {
    field: "amountNeededToBeRoasted",
    headerName: "Amount (kg)",
    width: 150,
    renderCell: (params: GridRenderCellParams<unknown, BeansTally>) => {
      return (
        <>
          {params.row.amountNeededToBeRoasted &&
            (params.row.amountNeededToBeRoasted / 1000).toFixed(2)}{" "}
          kg
        </>
      );
    },
  },
];

interface CalculationsTableProps {
  calculation: Calculation | null;
}
const CalculationTables = (props: CalculationsTableProps) => {
  const { calculation } = props;
  return (
    <Box
      sx={{
        flexGrow: "1",
        display: "flex",
        gap: "1rem",
      }}
    >
      <DataGrid
        loading={!calculation}
        sx={{ width: "20rem", bgcolor: "white" }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        rows={calculation ? calculation.ordersCalculatedInformation : []}
        columns={ordersColumns}
        disableSelectionOnClick
        density="compact"
      />
      <DataGrid
        loading={!calculation}
        sx={{ width: "20rem", bgcolor: "white" }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        rows={calculation ? calculation.beansTally : []}
        columns={beansTallyColumns}
        disableSelectionOnClick
        density="compact"
      />
      <DataGrid
        loading={!calculation}
        sx={{ width: "20rem", bgcolor: "white" }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        rows={calculation ? calculation.productsTally : []}
        columns={productTallyColumns}
        disableSelectionOnClick
        density="compact"
      />
    </Box>
  );
};

export { CalculationTables };
