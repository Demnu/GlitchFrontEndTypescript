import { Box, Chip, ClickAwayListener, Popper, Dialog } from "@mui/material";
import { ProductExtendedJsonSchema, RecipeDto } from "../../../glitchHubApi";
import { useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { ProductCard } from "./ProductCard";
import { NewRecipeForm } from "./NewRecipeForm";

interface ProductChipProps {
  product: ProductExtendedJsonSchema;
  recipe: RecipeDto | undefined;
  refetchRecipes: () => void;
}
const ProductChip = (props: ProductChipProps) => {
  const { product, recipe } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
    // When closing the dialog, reset the creation state.
    if (isDialogOpen) {
      setIsCreatingRecipe(false);
    }
  };
  return (
    <>
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
      <Dialog open={isDialogOpen} onClose={toggleDialog}>
        {!!recipe && (
          <RecipeCard
            product={product}
            recipe={recipe}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        )}
        {!recipe && !isCreatingRecipe && (
          <ProductCard
            product={product}
            onCreate={() => setIsCreatingRecipe(true)}
            onNotNeeded={() => {}}
          />
        )}
        {isCreatingRecipe && (
          <NewRecipeForm product={product} onSave={() => {}} />
        )}
      </Dialog>
    </>
  );
};

export { ProductChip };
