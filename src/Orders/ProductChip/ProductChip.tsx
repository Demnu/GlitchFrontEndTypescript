import { Box, Chip, Dialog } from "@mui/material";
import {
  MarkAsNotRecipeRequestDto,
  ProductExtendedJsonSchema,
  RecipeDto,
} from "../../../glitchHubApi";
import { useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { ProductCard } from "./ProductCard";
import { CreateRecipeCard } from "./CreateRecipeCard";
import { api } from "../../myApi";

interface ProductChipProps {
  product: ProductExtendedJsonSchema;
  recipe: RecipeDto | undefined;
  refetchRecipes: () => void;
  refetchOrders: () => void;
}

const markProductAsNotRecipe = async (productName: string) => {
  const request: MarkAsNotRecipeRequestDto = {
    productName: productName,
  };
  return await api.recipes.markProductAsNotRecipeCreate(request);
};

const ProductChip = (props: ProductChipProps) => {
  const { product, recipe, refetchRecipes, refetchOrders } = props;
  const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
    // When closing the dialog, reset the creation state.
    if (isDialogOpen) {
      setIsCreatingRecipe(false);
    }
  };

  const deleteRecipe = async () => {
    if (!!recipe) {
      await api.recipes.deleteRecipeDelete({ recipeId: recipe.id });
    }
  };

  return (
    <>
      {/* Handle chip */}
      <Box sx={{ ":hover": { cursor: "pointer" } }} onClick={toggleDialog}>
        <Chip
          variant={isDialogOpen ? "filled" : "outlined"}
          color={
            product.hasRecipe
              ? "info"
              : product.possiblyCoffee
              ? "warning"
              : "default"
          }
          key={product.id}
          label={`${product.productName} - ${product.amountOrdered}`}
          sx={{ userSelect: "none" }}
        />
      </Box>

      {/* Handle dialogues */}
      <Dialog
        open={isDialogOpen}
        onClose={toggleDialog}
        scroll="body"
        sx={{ maxHeight: "50rem" }}
      >
        {!!recipe && <RecipeCard product={product} recipe={recipe} />}
        {!recipe && !isCreatingRecipe && (
          <ProductCard
            product={product}
            onCreate={() => setIsCreatingRecipe(true)}
            onNotNeeded={async () => {
              await markProductAsNotRecipe(product.productName);
              setIsDialogOpen(false);
              refetchOrders();
              refetchRecipes();
            }}
          />
        )}
        {isCreatingRecipe && (
          <CreateRecipeCard
            product={product}
            onSave={() => {
              toggleDialog();
              setIsCreatingRecipe(false);
              refetchRecipes();
              refetchOrders();
            }}
          />
        )}
      </Dialog>
    </>
  );
};

export { ProductChip };
