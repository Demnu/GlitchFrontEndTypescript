import { Box, Button, Chip, Dialog, Paper } from "@mui/material";
import { MAX_INPUT_HEIGHT } from "../consts";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useViewNavigate } from "../hooks/useViewNavigate";
import { CREATE_BLEND_PAGE_INFO, createRouteInfo } from "../routeStrings";
import { api } from "../myApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ListBlendsQueryRequestDto,
  ListBlendsQueryRequestDtos,
} from "../../glitchHubApi";
import { EditBlend } from "./EditBlend/EditBlend";
const columnsDefs: GridColDef[] = [
  { field: "id", headerName: "Blend Id", width: 90 },
  { field: "blendName", headerName: "Blend Name", width: 400 },
  {
    field: "recipes",
    headerName: "Recipes",
    width: 8000,
    renderCell: (
      params: GridRenderCellParams<unknown, ListBlendsQueryRequestDto>
    ) => {
      return (
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          {params.row.recipes.map((recipe, i) => {
            // find corresponding recipe if not undefined
            return <Chip label={recipe.recipeName} />;
          })}
        </Box>
      );
    },
  },
];

const BlendsList = () => {
  const [blends, setBlends] = useState<ListBlendsQueryRequestDtos>();
  useState<ListBlendsQueryRequestDto>();
  const { data: fetchedBlends, isLoading } = useQuery(
    ["blends"],
    api.blends.listBlendsList,
    {
      refetchOnWindowFocus: false,
      refetchInterval: 300000,
    }
  );

  useEffect(() => {
    if (!!fetchedBlends && !!fetchedBlends.data) {
      setBlends(fetchedBlends.data);
      console.log(blends);
    }
  }, [fetchedBlends]);

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
      <Paper sx={{ flexGrow: "1" }}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          onRowClick={(params) => {
            viewNavigate(createRouteInfo("blend/" + params.id, "Edit Blend"));
          }}
          disableSelectionOnClick
          loading={isLoading}
          rows={blends ? blends : []}
          columns={columnsDefs}
          density="compact"
        />
      </Paper>
    </Box>
  );
};

export { BlendsList };
