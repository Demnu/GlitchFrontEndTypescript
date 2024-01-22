import React from "react";
import ReactDOM from "react-dom/client";
import App from "./DashboardLayout/DashboardLayout.tsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Orders } from "./Orders/Orders.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { Login } from "./Login.tsx";
import {
  CALCULATIONS_PAGE_INFO,
  CREATE_RECIPE_PAGE_INFO,
  LOGOUT_PAGE_INFO,
  ORDERS_PAGE_INFO,
  RECIPES_PAGE_INFO,
  UNSAVED_CALCULATION_PAGE_INFO,
} from "./routeStrings.tsx";
import { UnsavedCalculationPage } from "./Calculation/UnsavedCalculation.tsx";
import { CalculationsList } from "./Calculation/CalculationsList.tsx";
import { Recipes } from "./recipes/Recipes.tsx";
import { CreateRecipePage } from "./recipes/CreateRecipePage.tsx";
const DashboardLayout = () => {
  return (
    <App>
      <Outlet />
    </App>
  );
};
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    children: [
      {
        path: LOGOUT_PAGE_INFO.path,
        element: <Login />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: ORDERS_PAGE_INFO.path,
            element: <Orders />,
          },
          {
            path: CALCULATIONS_PAGE_INFO.path,
            element: <CalculationsList />,
          },
          {
            path: RECIPES_PAGE_INFO.path,
            element: <Recipes />,
          },
          {
            path: CREATE_RECIPE_PAGE_INFO.path,
            element: <CreateRecipePage />,
          },
          {
            path: UNSAVED_CALCULATION_PAGE_INFO.path,
            element: <UnsavedCalculationPage />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
