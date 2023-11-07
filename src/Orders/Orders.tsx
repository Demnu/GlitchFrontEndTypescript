import { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { api } from "../myApi";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Paper } from "@mui/material";
import {
  OrderDtos,
  OrderDto,
  MakeCalculationRequestDto,
} from "../../glitchHubApi";
import { ProductChip } from "./ProductChip/ProductChip";
import { OrdersTableFilters } from "./OrdersTableFilters";
import { useOrdersTableFiltersStore } from "./OrdersTableFiltersStore";
import { OrdersLegend } from "./OrdersLegend";
import { formatOrderStatus } from "./OrdersUtils";
const makeCalculation = async (selectedIds: string[]) => {
  const request: MakeCalculationRequestDto = { orderIds: selectedIds };
  return await api.calculations.makeCalculationCreate(request);
};

const Orders = () => {
  const [selectedOrders, setSelectedOrders] = useState<GridSelectionModel>([]);
  const [formattedOrders, setFormattedOrders] = useState<OrderDtos>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderDtos>([]);
  const { hideCalculatedOrders } = useOrdersTableFiltersStore();
  const {
    isLoading,
    data: orders,
    refetch,
  } = useQuery(["orders"], api.orders.listOrdersList, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  });

  const {
    data: recipes,
    isLoading: isLoadingRecipes,
    refetch: refetchRecipes,
  } = useQuery(["recipes"], api.recipes.listRecipesList, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  });

  const handleSelection = (item: GridSelectionModel) => {
    setSelectedOrders(item);
  };

  useEffect(() => {
    if (!isLoading && !isLoadingRecipes) {
      const ordersFormatted: OrderDtos = orders?.data
        ? orders?.data.map((order) => {
            const dateCreated = order.dateCreated;
            let date: Date = new Date();
            if (dateCreated) {
              date = new Date(dateCreated);
            }
            return {
              id: order.id,
              customerName: order.customerName,
              products: order.products ? order.products : [],
              orderStatus: order.orderStatus,
              dateCreated: date.toLocaleDateString(),
              invoiceNumber: order.invoiceNumber,
            };
          })
        : [];
      setFormattedOrders(ordersFormatted);
      setFilteredOrders(ordersFormatted);
    }
  }, [orders?.data, isLoadingRecipes, isLoading]);

  useEffect(() => {
    let ordersFiltered: OrderDtos = [];
    if (hideCalculatedOrders) {
      ordersFiltered = formattedOrders.filter(
        (order) => order.orderStatus === "notCalculated"
      );
      setFilteredOrders(ordersFiltered);
    } else {
      setFilteredOrders(formattedOrders);
    }
  }, [hideCalculatedOrders, formattedOrders]);

  const columnsHide: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 90, hideable: true },

    { field: "invoiceNumber", headerName: "Invoice Number", width: 90 },

    {
      field: "customerName",
      headerName: "Customer",
      width: 150,
    },
    {
      field: "dateCreated",
      headerName: "Order Date",
      width: 120,
    },
    {
      field: "products",
      headerName: "Products",
      width: 8000,
      renderCell: (params: GridRenderCellParams<unknown, OrderDto>) => {
        return (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            {params.row.products.map((product, i) => {
              // find corresponding recipe if not undefined
              const recipe = recipes?.data.find((r) =>
                r?.recipeName?.includes(product.productName)
              );

              return (
                <ProductChip
                  key={i}
                  product={product}
                  recipe={recipe}
                  refetchRecipes={refetchRecipes}
                  refetchOrders={refetch}
                />
              );
            })}
          </Box>
        );
      },
    },
  ];
  const columnsShow: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 90 },
    { field: "invoiceNumber", headerName: "Invoice Number", width: 90 },

    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 120,
      valueGetter: (params) => {
        return formatOrderStatus(params.row);
      },
    },

    {
      field: "customerName",
      headerName: "Customer",
      width: 150,
    },
    {
      field: "dateCreated",
      headerName: "Order Date",
      width: 120,
    },
    {
      field: "products",
      headerName: "Products",
      width: 8000,
      renderCell: (params: GridRenderCellParams<unknown, OrderDto>) => {
        return (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            {params.row.products.map((product, i) => {
              // find corresponding recipe if not undefined
              const recipe = recipes?.data.find((r) =>
                r?.recipeName?.includes(product.productName)
              );

              return (
                <ProductChip
                  key={i}
                  product={product}
                  recipe={recipe}
                  refetchRecipes={refetchRecipes}
                  refetchOrders={refetch}
                />
              );
            })}
          </Box>
        );
      },
    },
  ];

  const calculateOrdersOnClickHandler = async () => {
    const calculationResult = await makeCalculation(selectedOrders as string[]);
    refetch();
    console.log(calculationResult.data);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Button
          size="large"
          variant={selectedOrders.length <= 0 ? "outlined" : "contained"}
          disabled={selectedOrders.length <= 0}
          onClick={calculateOrdersOnClickHandler}
        >
          {selectedOrders.length <= 0 ? "Select Orders" : "Calculate Orders"}
        </Button>
        <OrdersTableFilters />
      </Box>

      <Paper sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <OrdersLegend />
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            loading={isLoading}
            rows={filteredOrders}
            columns={hideCalculatedOrders ? columnsHide : columnsShow}
            checkboxSelection
            disableSelectionOnClick
            density="compact"
            onSelectionModelChange={(item) => handleSelection(item)}
          />
        </Box>
      </Paper>
      {/* <div
        className={`${!showRoastingList && " hidden"} flex h-screen flex-col`}
      >
        {showRoastingList && (
          <RoastingList
            selectedOrders={selectedOrders}
            setShowRoastingList={setShowRoastingList}
          />
        )}
      </div> */}
    </>
  );
};
export { Orders };
