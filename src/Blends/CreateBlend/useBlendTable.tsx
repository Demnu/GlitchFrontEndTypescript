import { useState } from "react";
import { RecipeDto, RecipeDtos } from "../../../glitchHubApi";

const useBlendTable = () => {
  const [recipesInBlend, setRecipesInBlend] = useState<RecipeDtos>([]);
  const [recipesNotInBlend, setRecipesNotInBlend] = useState<RecipeDtos>([]);

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
  return {
    recipesInBlend,
    recipesNotInBlend,
    setRecipesInBlend,
    setRecipesNotInBlend,
    addRecipeToBlend,
    removeRecipeFromBlend,
  };
};
export default useBlendTable;
