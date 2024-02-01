import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Recipe } from "./EditBlend";
import { Box } from "@mui/material";
import { green } from "@mui/material/colors";

interface EditRecipeBlendTablesProps {
  recipesInBlend: Recipe[];
  recipesNotInBlend: Recipe[];
  addRecipeToBlend: (recipe: Recipe) => void;
  removeRecipeFromBlend: (recipe: Recipe) => void;
}
const columnsDefs: GridColDef[] = [
  { field: "id", headerName: "Product Id", width: 90 },
  { field: "recipeName", headerName: "Recipe Name", width: 300 },
];
const EditRecipeBlendTables = (props: EditRecipeBlendTablesProps) => {
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

export { EditRecipeBlendTables };
