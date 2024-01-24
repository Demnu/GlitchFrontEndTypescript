import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { ProductExtendedJsonSchema, RecipeDto } from "../../../glitchHubApi";

interface RecipeCardProps {
  product: ProductExtendedJsonSchema;
  recipe: RecipeDto;
}

const RecipeCard = (props: RecipeCardProps) => {
  const { product, recipe } = props;

  // Function to format the total weight
  const formatTotalWeight = (total: number) => `${total.toFixed(2)}g`;
  return (
    <Card
      elevation={4}
      sx={{ minWidth: "20rem", overflow: "hidden", borderRadius: "16px" }}
    >
      <CardContent sx={{ padding: "1.5rem" }}>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Recipe for
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          {product.productName}
        </Typography>
        <Divider sx={{ my: "1rem" }} />
        <Box sx={{ maxHeight: "15rem", overflowY: "auto" }}>
          {recipe.recipe_beans.map((rb, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "0.5rem",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "monospace",
                  flex: 1,
                  mr: "1rem",
                  fontSize: "16px",
                }}
              >
                {rb.bean.beanName}
              </Typography>
              <Typography
                variant="body1"
                sx={{ width: "4rem", textAlign: "right" }}
              >
                {rb.amountOrdered}g
              </Typography>
            </Box>
          ))}
        </Box>
        <Divider sx={{ my: "1rem" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Total:
          </Typography>
          <Typography variant="subtitle1">
            {formatTotalWeight(
              recipe.recipe_beans.reduce(
                (total, rb) => total + rb.amountOrdered,
                0
              )
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export { RecipeCard };
