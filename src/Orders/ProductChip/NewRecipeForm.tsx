import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import {
  ProductExtendedJsonSchema,
  RecipeRequestDto,
} from "../../../glitchHubApi";

interface NewRecipeFormProps {
  product: ProductExtendedJsonSchema;
  onSave: (recipe: RecipeRequestDto) => void; // Function to handle save events
}

const NewRecipeForm = ({ product, onSave }: NewRecipeFormProps) => {
  const [beans, setBeans] = useState([{ beanId: 0, beanAmount: 0 }]);

  const handleSave = () => {
    const recipe: RecipeRequestDto = {
      productId: product.id,
      recipeName: product.productName,
      beans: beans,
    };
    onSave(recipe);
  };

  const addBean = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setBeans([...beans, { beanId: 0, beanAmount: 0 }]);
  };

  const updateBean = (
    index: number,
    field: "beanId" | "beanAmount",
    value: number
  ) => {
    const newBeans = [...beans];
    newBeans[index][field] = value;
    setBeans(newBeans);
  };

  return (
    <Card
      elevation={4}
      sx={{ minWidth: "20rem", overflow: "hidden", borderRadius: "16px" }}
    >
      <CardContent sx={{ padding: "1.5rem" }}>
        <Typography variant="h6" gutterBottom component="div">
          Create New Recipe for {product.productName}
        </Typography>
        <Divider sx={{ my: "1rem" }} />
        {beans.map((bean, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <TextField
              size="small"
              label="Bean ID"
              variant="outlined"
              type="number"
              value={bean.beanId}
              onChange={(e) =>
                updateBean(index, "beanId", parseInt(e.target.value))
              }
              sx={{ flexGrow: 1 }}
            />
            <TextField
              size="small"
              label="Amount (g)"
              variant="outlined"
              type="number"
              value={bean.beanAmount}
              onChange={(e) =>
                updateBean(index, "beanAmount", parseInt(e.target.value))
              }
              sx={{ flexGrow: 1 }}
            />
          </Box>
        ))}
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={addBean}
        >
          Add Bean
        </Button>
      </CardContent>
      <Divider sx={{ my: "1rem" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 1.5rem 1.5rem",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Recipe
        </Button>
      </Box>
    </Card>
  );
};

export { NewRecipeForm };
