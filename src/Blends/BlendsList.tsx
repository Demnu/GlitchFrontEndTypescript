import { Box, Button, Paper } from "@mui/material";
import { MAX_INPUT_HEIGHT } from "../consts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useViewNavigate } from "../hooks/useViewNavigate";
import { CREATE_BLEND_PAGE_INFO } from "../routeStrings";

const columnsDefs: GridColDef[] = [
  { field: "id", headerName: "Blend Id", width: 90 },
  { field: "blendName", headerName: "Blend Name", width: 400 },
];
const BlendsList = () => {
  const viewNavigate = useViewNavigate();
  return (
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
          viewNavigate(CREATE_BLEND_PAGE_INFO);
        }}
      >
        Create Blend
      </Button>
      <Paper>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          onRowClick={(params) => {
            // setRecipeToBeEdited(params.row);
            // setShowEditRecipeDialog(true);
          }}
          disableSelectionOnClick
          loading={false}
          rows={[]}
          columns={columnsDefs}
          density="compact"
        />
      </Paper>
    </Box>
  );
};

export { BlendsList };
