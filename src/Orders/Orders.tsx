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
import { MAX_INPUT_HEIGHT } from "../consts";
const makeCalculation = async (selectedIds: string[]) => {
  const request: MakeCalculationRequestDto = { orderIds: selectedIds };
  return await api.calculations.makeCalculationCreate(request);
};
const fetchOrders = (dateFrom: string, dateTo: string) => {
  console.log(dateFrom, dateTo);
  return api.orders
    .listOrdersCreate({ dateFrom, dateTo })
    .then((response) => response.data);
};

const Orders = () => {
  const [selectedOrders, setSelectedOrders] = useState<GridSelectionModel>([]);
  const [formattedOrders, setFormattedOrders] = useState<OrderDtos>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderDtos>([]);
  const [isDataGridReady, setIsDateGridReady] = useState(false);
  const { hideCalculatedOrders, dateFrom, dateTo, searchText } =
    useOrdersTableFiltersStore();
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["orders", dateFrom, dateTo], () =>
    fetchOrders(dateFrom.toISOString(), dateTo.toISOString())
  );

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
      const ordersFormatted: OrderDtos = orders
        ? orders.map((order) => {
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
      setIsDateGridReady(true);
    }
    // Add dateFrom and dateTo to the dependency array
  }, [orders, isLoadingRecipes, isLoading, dateFrom, dateTo]);
  useEffect(() => {
    let ordersFiltered: OrderDtos = formattedOrders;

    // Filter by searchText if it's provided
    if (searchText) {
      ordersFiltered = ordersFiltered.filter((order) => {
        const searchRegExp = new RegExp(searchText, "i"); // 'i' for case-insensitive
        const orderMatch =
          searchRegExp.test(order.customerName) ||
          searchRegExp.test(order.id) ||
          searchRegExp.test(order.invoiceNumber) ||
          searchRegExp.test(order.dateCreated);

        // Check if searchText is part of any product's productName or sku
        const productMatch = order.products.some(
          (product) =>
            searchRegExp.test(product.productName) ||
            searchRegExp.test(product.sku)
        );

        return orderMatch || productMatch;
      });
    }

    // Filter by hideCalculatedOrders if the toggle is on
    if (hideCalculatedOrders) {
      ordersFiltered = ordersFiltered.filter(
        (order) => order.orderStatus === "notCalculated"
      );
    }

    // Set the filtered orders, or reset back to the original if no filters are active
    if (!searchText && !hideCalculatedOrders) {
      setFilteredOrders(formattedOrders);
    } else {
      setFilteredOrders(ordersFiltered);
    }
  }, [hideCalculatedOrders, formattedOrders, searchText, orders]);

  const columnsDefs: GridColDef[] = [
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
              const recipe = recipes?.data.find(
                (r) => r?.recipeName === product.productName
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
      <Button
        sx={{ maxHeight: MAX_INPUT_HEIGHT, maxWidth: "20rem" }}
        size="large"
        variant={selectedOrders.length <= 0 ? "outlined" : "contained"}
        disabled={selectedOrders.length <= 0}
        onClick={calculateOrdersOnClickHandler}
      >
        Calculate Orders
      </Button>
      <OrdersTableFilters />

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
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
            loading={!isDataGridReady}
            rows={filteredOrders}
            columns={columnsDefs}
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
