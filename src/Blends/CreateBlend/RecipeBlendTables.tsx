import { Box } from "@mui/material";
import { green } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RecipeDto, RecipeDtos } from "../../../glitchHubApi";
interface RecipeBlendTablesProps {
  recipesInBlend: RecipeDtos;
  recipesNotInBlend: RecipeDtos;
  addRecipeToBlend: (recipe: RecipeDto) => void;
  removeRecipeFromBlend: (recipe: RecipeDto) => void;
}
const columnsDefs: GridColDef[] = [
  { field: "id", headerName: "Product Id", width: 90 },
  { field: "recipeName", headerName: "Recipe Name", width: 300 },
];
const RecipeBlendTables = (props: RecipeBlendTablesProps) => {
  const {
    recipesInBlend,
    recipesNotInBlend,
    addRecipeToBlend,
    removeRecipeFromBlend,
  } = props;
  return (
    <Box sx={{ display: "flex", gap: "1rem", flexGrow: "1", width: "50rem" }}>
      <Box>
        <Box sx={{ fontSize: "20px" }}>Recipes in blend</Box>
        <DataGrid
          sx={{ height: "40rem", bgcolor: green[200] }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          onRowClick={(params) => {
            removeRecipeFromBlend(params.row);
          }}
          disableSelectionOnClick
          loading={false}
          rows={recipesInBlend}
          columns={columnsDefs}
          density="compact"
        />
      </Box>
      <Box>
        <Box sx={{ fontSize: "20px" }}>Recipes that can be added</Box>
        <DataGrid
          sx={{ height: "40rem", bgcolor: "pink" }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          onRowClick={(params) => {
            addRecipeToBlend(params.row);
          }}
          disableSelectionOnClick
          loading={false}
          rows={recipesNotInBlend}
          columns={columnsDefs}
          density="compact"
        />
      </Box>
    </Box>
  );
};
export { RecipeBlendTables };
