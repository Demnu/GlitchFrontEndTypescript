import { Box, Chip, ClickAwayListener, Popper } from "@mui/material";
import { ProductExtendedJsonSchema, RecipeDto } from "../../../glitchHubApi";
import { useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { NewRecipeCard } from "./NewRecipeCard";

interface ProductChipProps {
  product: ProductExtendedJsonSchema;
  recipe: RecipeDto | undefined;
  refetchRecipes: () => void;
}
const ProductChip = (props: ProductChipProps) => {
  const { product, recipe } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const showPopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <Popper
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4],
            },
          },
          {
            name: "arrow",
            enabled: true,
          },
        ]}
        id={product.id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
      >
        {!!recipe && (
          <RecipeCard
            product={product}
            recipe={recipe}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        )}
        {!recipe && (
          <NewRecipeCard
            product={product}
            onCreate={() => {}}
            onNotNeeded={() => {}}
          />
        )}
      </Popper>
      <ClickAwayListener
        onClickAway={() => {
          setAnchorEl(null);
        }}
      >
        <Box sx={{ ":hover": { cursor: "pointer" } }} onClick={showPopper}>
          <Chip
            variant={open ? "filled" : "outlined"}
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
      </ClickAwayListener>
    </>
  );
};

export { ProductChip };
