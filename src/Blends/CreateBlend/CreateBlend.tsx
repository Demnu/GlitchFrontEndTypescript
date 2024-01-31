import { Box, Button, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { MAX_INPUT_HEIGHT } from "../../consts";
import { CreateBlendRequestDto, RecipeDtos } from "../../../glitchHubApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../myApi";
import { RecipeBlendTables } from "./RecipeBlendTables";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import useBlendTable from "./useBlendTable";
import { useViewNavigate } from "../../hooks/useViewNavigate";
import { BLENDS_PAGE_INFO } from "../../routeStrings";

const CreateBlend = () => {
  const viewNavigate = useViewNavigate();
  const [blendName, setBlendName] = useState("");
  const {
    recipesInBlend,
    recipesNotInBlend,
    addRecipeToBlend,
    removeRecipeFromBlend,
    setRecipesNotInBlend,
  } = useBlendTable();

  const saveBlendMutation = useMutation({
    mutationFn: (newBlend: CreateBlendRequestDto) => {
      return api.blends.createBlendCreate(newBlend);
    },
    onSuccess: () => {
      console.log("hiihihiih");
      viewNavigate(BLENDS_PAGE_INFO);
    },
  });

  const saveBlendClickHandler = () => {
    let savedBlend: CreateBlendRequestDto = {
      blendName: blendName,
      recipeIds:
        recipesInBlend.length > 0 ? recipesInBlend.map((r) => r.id) : undefined,
    };
    saveBlendMutation.mutate(savedBlend);
  };

  const {
    data: fetchedRecipes,
    isLoading: isLoadingRecipes,
    refetch: refetchRecipes,
  } = useQuery(["recipes"], api.recipes.listRecipesList, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  });
  useEffect(() => {
    if (!!fetchedRecipes?.data) {
      let recipesWithoutBlend: RecipeDtos = [];
      fetchedRecipes.data.forEach((r) => {
        if (!r.blends) {
          recipesWithoutBlend.push(r);
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
        <Box fontSize={"24px"}>Create a new blend</Box>
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
            onClick={saveBlendClickHandler}
            type="submit"
          >
            Create blend
          </Button>
          <Box>
            <TouchAppIcon />
            Click the recipes to add and remove for the blend
          </Box>
        </Box>

        <RecipeBlendTables
          recipesInBlend={recipesInBlend}
          recipesNotInBlend={recipesNotInBlend}
          addRecipeToBlend={addRecipeToBlend}
          removeRecipeFromBlend={removeRecipeFromBlend}
        />
      </Paper>
    </>
  );
};
export { CreateBlend };
