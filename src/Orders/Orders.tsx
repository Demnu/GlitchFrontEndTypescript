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
import { ProductChip } from "./ProductChip";
import { OrdersTableFilters } from "./OrdersTableFilters";
import { useOrdersTableFiltersStore } from "./OrdersTableFiltersStore";
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

  const handleSelection = (item: GridSelectionModel) => {
    setSelectedOrders(item);
  };

  useEffect(() => {
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
          };
        })
      : [];
    setFormattedOrders(ordersFormatted);
    setFilteredOrders(ordersFormatted);
  }, [orders?.data]);

  useEffect(() => {
    let ordersFiltered: OrderDtos = [];
    if (hideCalculatedOrders) {
      console.log("here");
      ordersFiltered = formattedOrders.filter(
        (order) => order.orderStatus === "notCalculated"
      );
      setFilteredOrders(ordersFiltered);
    } else {
      setFilteredOrders(formattedOrders);
    }
  }, [hideCalculatedOrders, formattedOrders]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 90 },

    {
      field: "customerName",
      headerName: "Customer",
      width: 150,
    },
    {
      field: "dateCreated",
      headerName: "Order Date",
      width: 170,
    },
    {
      field: "products",
      headerName: "Products",
      width: 3000,
      renderCell: (params: GridRenderCellParams<unknown, OrderDto>) => {
        return (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            {params.row.products.map((product) => (
              <ProductChip product={product} />
            ))}
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
          variant={selectedOrders.length <= 0 ? "outlined" : "contained"}
          disabled={selectedOrders.length <= 0}
          onClick={calculateOrdersOnClickHandler}
        >
          Calculate Orders
        </Button>
        <OrdersTableFilters />
      </Box>

      <Paper sx={{ flexGrow: 1 }}>
        <DataGrid
          loading={isLoading}
          rows={filteredOrders}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          density="compact"
          onSelectionModelChange={(item) => handleSelection(item)}
        />
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
