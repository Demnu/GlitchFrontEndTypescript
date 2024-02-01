import { useState } from "react";
import { Recipe } from "./EditBlend";

const useEditBlendTable = () => {
  const [recipesInBlend, setRecipesInBlend] = useState<Recipe[]>([]);
  const [recipesNotInBlend, setRecipesNotInBlend] = useState<Recipe[]>([]);

  const removeRecipeFromBlend = (recipe: Recipe) => {
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

  const addRecipeToBlend = (recipe: Recipe) => {
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
export default useEditBlendTable;
