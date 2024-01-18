import { Box, Chip, Paper } from "@mui/material";
import { RecipesLegend } from "./RecipesLegend";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { OrderDto, RecipeDto, RecipeDtos } from "../../glitchHubApi";
import { useQuery } from "@tanstack/react-query";
import { api } from "../myApi";
import { ProductChip } from "../Orders/ProductChip/ProductChip";
import { RecipesFilters } from "./RecipesFilters";
import { useEffect, useState } from "react";
import { useRecipesFiltersStore } from "./RecipesFiltersStore";

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
  const { searchText } = useRecipesFiltersStore();
  const [recipes, setRecipes] = useState<RecipeDtos>([]);
  const {
    data: fetchedRecipes,
    isLoading: isLoadingRecipes,
    refetch: refetchRecipes,
  } = useQuery(["recipes"], api.recipes.listRecipesList, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  });

  useEffect(() => {
    if (!isLoadingRecipes) {
      setRecipes(fetchedRecipes?.data ?? []);
    }
  }, [fetchedRecipes]);

  useEffect(() => {
    if (searchText.length > 0 && !!fetchedRecipes?.data) {
      let filteredRecipes = fetchedRecipes?.data;
      filteredRecipes = filteredRecipes.filter((recipe) => {
        const searchRegExp = new RegExp(searchText, "i"); // 'i' for case-insensitive

        // filter using recipe name
        const recipeMatch = searchRegExp.test(recipe.recipeName);

        // filter using beans
        const beanMatch = recipe.recipe_beans.some((rb) =>
          searchRegExp.test(rb.bean.beanName)
        );
        return recipeMatch || beanMatch;
      });
      setRecipes(filteredRecipes);
    } else {
      setRecipes(fetchedRecipes?.data ?? []);
    }
  }, [searchText, isLoadingRecipes]);

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
          rows={recipes}
          columns={columnsDefs}
          density="compact"
        />
      </Paper>
    </Box>
  );
};
export { Recipes };
