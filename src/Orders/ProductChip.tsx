import { Box, Chip, ClickAwayListener, Paper, Popper } from "@mui/material";
import { ProductExtendedJsonSchema } from "../../glitchHubApi";
import { useState } from "react";
import { grey } from "@mui/material/colors";

interface ProductChipProps {
  product: ProductExtendedJsonSchema;
}
const ProductChip = (props: ProductChipProps) => {
  const { product } = props;
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
        <Paper
          sx={{
            borderRadius: "0.5rem",
            border: 1.8,
            p: 1,
            borderColor: grey[500],
            minWidth: "10rem",
            minHeight: "10rem",
            boxShadow: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>{product.productName}</Box>
            <Box>Recipe:</Box>
          </Box>
        </Paper>
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
