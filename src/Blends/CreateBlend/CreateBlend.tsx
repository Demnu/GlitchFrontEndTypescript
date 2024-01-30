import { Box, Button, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { MAX_INPUT_HEIGHT } from "../../consts";
import { RecipeDto, RecipeDtos } from "../../../glitchHubApi";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../myApi";
import { RecipeBlendTables } from "./RecipeBlendTables";
import TouchAppIcon from "@mui/icons-material/TouchApp";
const CreateBlend = () => {
  const [blendName, setBlendName] = useState<String>("");
  const [recipesInBlend, setRecipesInBlend] = useState<RecipeDtos>([]);
  const [recipesNotInBlend, setRecipesNotInBlend] = useState<RecipeDtos>([]);
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

  const removeRecipeFromBlend = (recipe: RecipeDto) => {
    // remove recipe from green table
    setRecipesInBlend((prevRecipesInBlend) =>
      prevRecipesInBlend.filter((r) => r.recipeName !== recipe.recipeName)
    );

    // add recipe back to red table
    setRecipesNotInBlend((prevRecipesNotInBlend) => [
      ...prevRecipesNotInBlend,
      recipe,
    ]);
  };

  const addRecipeToBlend = (recipe: RecipeDto) => {
    console.log(recipe);

    // add recipe to green table
    setRecipesInBlend((prevRecipesInBlend) => [...prevRecipesInBlend, recipe]);

    // remove recipe from red table
    setRecipesNotInBlend((prevRecipesNotInBlend) =>
      prevRecipesNotInBlend.filter((r) => r.recipeName !== recipe.recipeName)
    );
  };

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
            onClick={() => {}}
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
