import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { ProductExtendedJsonSchema } from "../../../glitchHubApi";

interface NewRecipeCardProps {
  product: ProductExtendedJsonSchema;
  onCreate: () => void; // Function to handle create recipe events
  onNotNeeded: () => void; // Function to handle 'recipe not needed' events
}

const NewRecipeCard = (props: NewRecipeCardProps) => {
  const { product, onCreate, onNotNeeded } = props;

  return (
    <Card
      elevation={4}
      sx={{
        width: "25rem",
        overflow: "hidden",
        borderRadius: "16px",
      }}
    >
      <CardContent sx={{ padding: "1.5rem" }}>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {product.possiblyCoffee ? "Unassigned Recipe" : "Product Information"}
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          {product.productName}
        </Typography>
        <Divider sx={{ my: "1rem" }} />
        <Box
          sx={{
            maxHeight: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            overflowY: "auto",
          }}
        >
          {product.possiblyCoffee ? (
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              It seems this product may require a recipe. Use the button below
              to create a unique blend of beans.
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              Currently, there is no recipe associated with this product.
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions
        sx={{ justifyContent: "space-between", padding: "0 1.5rem 1.5rem" }}
      >
        <Button variant="outlined" color="primary" onClick={onCreate}>
          Create Recipe
        </Button>
        {product.possiblyCoffee && (
          <Button variant="outlined" color="error" onClick={onNotNeeded}>
            Mark as Not Needed
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export { NewRecipeCard };
