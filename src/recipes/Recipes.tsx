import { Box, Chip, Paper } from "@mui/material";
import { RecipesLegend } from "./RecipesLegend";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { OrderDto, RecipeDto, RecipeDtos } from "../../glitchHubApi";
import { useQuery } from "@tanstack/react-query";
import { api } from "../myApi";
import { ProductChip } from "../Orders/ProductChip/ProductChip";
import { RecipesFilters } from "./RecipesFilters";

const columnsDefs: GridColDef[] = [
  { field: "id", headerName: "Product Id", width: 90 },
  { field: "recipeName", headerName: "Recipe Name", flex: 1 },
  {
    field: "recipe_beans",
    headerName: "Beans",
    flex: 1,
    renderCell: (params: GridRenderCellParams<unknown, RecipeDto>) => {
      return (
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          {params.row.recipe_beans.map((rb, i) => (
            <Chip
              key={i}
              label={rb.bean.beanName + " - " + rb.amountOrdered + "g"}
            />
          ))}
        </Box>
      );
    },
  },
];
[];
const Recipes = () => {
  const {
    data: recipes,
    isLoading: isLoadingRecipes,
    refetch: refetchRecipes,
  } = useQuery(["recipes"], api.recipes.listRecipesList, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Box>
        <RecipesFilters />
        <RecipesLegend />
      </Box>
      <Paper sx={{ flexGrow: 1 }}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          loading={isLoadingRecipes}
          rows={recipes?.data ?? []}
          columns={columnsDefs}
          density="compact"
        />
      </Paper>
    </Box>
  );
};
export { Recipes };
