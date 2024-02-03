import { useParams } from "react-router-dom";
import {
  DeleteBlendRequestDto,
  EditBlendRequestDto,
  ListBlendsQueryRequestDto,
  RecipeDtos,
} from "../../../glitchHubApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../myApi";
import { useEffect, useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import { MAX_INPUT_HEIGHT } from "../../consts";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import { EditRecipeBlendTables } from "./EditRecipeBlendTables";
import useEditBlendTable from "./useEditBlendTable";
import { useViewNavigate } from "../../hooks/useViewNavigate";
import { BLENDS_PAGE_INFO } from "../../routeStrings";

export interface Recipe {
  productId: string;
  blendId?: number;
  recipeName: string;
  id: number;
}

const EditBlend = () => {
  const [blendName, setBlendName] = useState("");
  const [selectedBlendId, setSelectedBlendId] = useState(-1);
  const viewNavigate = useViewNavigate();

  const {
    recipesInBlend,
    recipesNotInBlend,
    addRecipeToBlend,
    removeRecipeFromBlend,
    setRecipesNotInBlend,
    setRecipesInBlend,
  } = useEditBlendTable();
  const { blendId } = useParams();
  const { data: fetchedBlends, refetch: refetchBlends } = useQuery(
    ["blends"],
    api.blends.listBlendsList,
    {
      refetchOnWindowFocus: false,
      refetchInterval: 300000,
    }
  );
  const {
    data: fetchedRecipes,
    isLoading: isLoadingRecipes,
    refetch: refetchRecipes,
  } = useQuery(["recipes"], api.recipes.listRecipesList, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  });

  const editBlendClickHandler = () => {
    let editedBlend: EditBlendRequestDto = {
      blendId: selectedBlendId,
      recipeIds:
        recipesInBlend.length > 0 ? recipesInBlend.map((r) => r.id) : undefined,
    };
    editBlendMutation.mutate(editedBlend);
  };

  const deleteBlendClickHandler = () => {
    let deletedBlend: DeleteBlendRequestDto = {
      blendId: selectedBlendId,
    };
    deleteBlendMutation.mutate(deletedBlend);
  };

  const editBlendMutation = useMutation({
    mutationFn: (editedBlend: EditBlendRequestDto) => {
      return api.blends.editBlendCreate(editedBlend);
    },
    onSuccess: () => {
      refetchBlends();
      viewNavigate(BLENDS_PAGE_INFO);
    },
  });

  const deleteBlendMutation = useMutation({
    mutationFn: (deleteBlend: DeleteBlendRequestDto) => {
      return api.blends.deleteBlendDelete(deleteBlend);
    },
    onSuccess: () => {
      refetchBlends();
      viewNavigate(BLENDS_PAGE_INFO);
    },
  });

  //useEffect to find the selected blend
  useEffect(() => {
    const foundBlend = fetchedBlends?.data.filter(
      (b) => b.id.toString() === blendId
    );
    if (!!foundBlend && !!foundBlend[0]) {
      setBlendName(foundBlend[0].blendName);
      setSelectedBlendId(foundBlend[0].id);
      setRecipesInBlend(foundBlend[0].recipes);
    }
  }, []);
  //useEffect to find the recipes not associated with a blend
  useEffect(() => {
    if (!!fetchedRecipes?.data) {
      let recipesWithoutBlend: Recipe[] = [];
      fetchedRecipes.data.forEach((r) => {
        if (!r.blends) {
          const tempRecipe: Recipe = {
            productId: r.productId,
            recipeName: r.recipeName,
            id: r.id,
          };
          recipesWithoutBlend.push(tempRecipe);
        }
      });
      setRecipesNotInBlend(recipesWithoutBlend);
    }
  }, [fetchedRecipes]);
  return (
    <>
      <Paper
        sx={{
          p: "1rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
          flexGrow: "1",
        }}
      >
        <Box fontSize={"24px"}>Edit blend</Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ height: MAX_INPUT_HEIGHT, maxWidth: "20rem" }}
            autoComplete="off"
            size="small"
            required
            id="author"
            label="Blend Name"
            value={blendName}
            onChange={(e) => setBlendName(e.target.value)}
          />
          <Button
            sx={{ maxHeight: MAX_INPUT_HEIGHT, maxWidth: "20rem" }}
            size="large"
            variant={"contained"}
            disabled={blendName.length <= 0}
            onClick={editBlendClickHandler}
            type="submit"
          >
            Save changes
          </Button>
          <Button
            sx={{ maxHeight: MAX_INPUT_HEIGHT, maxWidth: "20rem" }}
            size="large"
            color="error"
            variant={"outlined"}
            disabled={blendName.length <= 0}
            onClick={deleteBlendClickHandler}
            type="submit"
          >
            Delete blend
          </Button>
          <Box>
            <TouchAppIcon />
            Click the recipes to add and remove for the blend
          </Box>
        </Box>
        {recipesInBlend && recipesNotInBlend && (
          <EditRecipeBlendTables
            recipesInBlend={recipesInBlend}
            recipesNotInBlend={recipesNotInBlend}
            addRecipeToBlend={addRecipeToBlend}
            removeRecipeFromBlend={removeRecipeFromBlend}
          />
        )}
      </Paper>
    </>
  );
};

export { EditBlend };
