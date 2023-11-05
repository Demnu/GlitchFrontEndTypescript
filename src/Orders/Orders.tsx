import { useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { api } from "../myApi";
import { useQuery } from "@tanstack/react-query";
import { Box, Chip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ProductExtendedDto } from "../../glitchHubApi";

const Orders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showRoastingList, setShowRoastingList] = useState(false);
  const { isLoading, data: orders } = useQuery(
    ["orders"],
    api.orders.listOrdersList,
    {
      refetchOnWindowFocus: false,
      refetchInterval: 300000,
    }
  );

  //   const handleSelection = (item) => {
  //     setSelectedOrders(item);
  //   };

  const ordersFormatted = orders?.data.map((order) => {
    const dateCreated = order.dateCreated;
    let date: Date = new Date();
    if (dateCreated) {
      date = new Date(dateCreated);
    }
    return {
      id: order.orderId,
      customerName: order.customerName,
      products: order.products ? order.products : [],
      dateCreated: date.toLocaleDateString(),
    };
  });

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
      renderCell: (params: GridRenderCellParams<unknown, any>) => {
        return (
          <div>
            {console.log(params.row.products)}

            {params.row.products.map((product) => (
              <Chip
                key={product.id}
                label={`${product.productName} - ${product.amountOrdered}`}
              />
            ))}
          </div>
        );
      },
    },
  ];

  const calculateOrdersOnClickHandler = () => {
    setShowRoastingList(true);
  };

  return (
    <div className="restOfScreenHeight mx-2 flex flex-col">
      <div
        className={` flex flex-grow flex-col ${showRoastingList && "hidden"}`}
      >
        <div className=" my-2 flex">
          <button
            onClick={calculateOrdersOnClickHandler}
            className={
              "w-52 rounded-sm bg-blue-700 py-2 text-center text-white hover:bg-blue-500"
            }
          >
            Calculate Orders
          </button>
        </div>
        <Box sx={{ bgcolor: grey[300], width: "90rem", height: "40rem" }}>
          {!!orders?.data &&
            orders?.data.length > 0 &&
            !!ordersFormatted &&
            ordersFormatted?.length > 0 && (
              <DataGrid
                loading={isLoading}
                rows={ordersFormatted}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                density="compact"
                //   onSelectionModelChange={(item) => handleSelection(item)}
              />
            )}
        </Box>
      </div>
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
    </div>
  );
};
export { Orders };
