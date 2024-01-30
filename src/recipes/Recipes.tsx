import { Box, Button, Chip, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { RecipeDto, RecipeDtos } from "../../glitchHubApi";
import { useQuery } from "@tanstack/react-query";
import { api } from "../myApi";
import { RecipesFilters } from "./RecipesFilters";
import { useEffect, useState } from "react";
import { useRecipesFiltersStore } from "./RecipesFiltersStore";
import { MAX_INPUT_HEIGHT } from "../consts";
import { CREATE_RECIPE_PAGE_INFO } from "../routeStrings";
import { useViewNavigate } from "../hooks/useViewNavigate";
import { EditRecipe } from "./RecipeActions/EditRecipe";

[];
const Recipes = () => {
  const [recipeToBeEdited, setRecipeToBeEdited] = useState<RecipeDto | null>(
    null
  );
  const [showEditRecipeDialog, setShowEditRecipeDialog] =
    useState<boolean>(false);

  const { searchText } = useRecipesFiltersStore();
  const [recipes, setRecipes] = useState<RecipeDtos>([]);
  const viewNavigate = useViewNavigate();

  const columnsDefs: GridColDef[] = [
    { field: "id", headerName: "Product Id", width: 90 },
    { field: "recipeName", headerName: "Recipe Name", width: 400 },
    {
      field: "recipe_beans",
      headerName: "Beans",
      width: 1000,
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: "1rem",
        }}
      >
        <Button
          sx={{ maxHeight: MAX_INPUT_HEIGHT, maxWidth: "20rem" }}
          size="large"
          variant={"contained"}
          onClick={() => {
            viewNavigate(CREATE_RECIPE_PAGE_INFO);
          }}
        >
          Create recipe
        </Button>
        <RecipesFilters />
        {/* <RecipesLegend /> */}

        <Paper sx={{ flexGrow: 1 }}>
          <DataGrid
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            onRowClick={(params) => {
              setRecipeToBeEdited(params.row);
              setShowEditRecipeDialog(true);
            }}
            disableSelectionOnClick
            loading={isLoadingRecipes}
            rows={recipes}
            columns={columnsDefs}
            density="compact"
          />
        </Paper>
      </Box>

      <EditRecipe
        refetch={refetchRecipes}
        recipe={recipeToBeEdited}
        isOpen={showEditRecipeDialog}
        onClose={() => {
          setShowEditRecipeDialog(false);
          setRecipeToBeEdited(null);
        }}
      />
    </>
  );
};
export { Recipes };
