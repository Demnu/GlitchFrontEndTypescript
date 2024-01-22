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
import { useQuery } from "@tanstack/react-query";
import { api } from "../../myApi";

interface CreateRecipeCardProps {
  product: ProductExtendedJsonSchema;
  onSave: () => void;
}

const CreateRecipeCard = ({ product, onSave }: CreateRecipeCardProps) => {
  const [beans, setBeans] = useState([{ beanName: "", beanAmount: 0 }]);

  const {
    data: beansData,
    isLoading,
    refetch,
  } = useQuery(["beans"], api.beans.listBeansList, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  });

  const handleSave = async () => {
    // get beans that already are saved
    const newBeans = [...beans];
    const recipe: RecipeRequestDto = {
      productId: product.id,
      recipeName: product.productName,
      beans: newBeans,
    };

    await api.recipes.createRecipeCreate(recipe);
    onSave();
  };
  const addBean = () => {
    setBeans([...beans, { beanName: "", beanAmount: 0 }]);
  };

  const updateBeanName = (index: number, newName: string) => {
    const newBeans = [...beans];
    newBeans[index]["beanName"] = newName;
    setBeans(newBeans);
  };

  const updateBeanAmount = (index: number, newAmount: number) => {
    const newBeans = [...beans];
    newBeans[index]["beanAmount"] = newAmount;
    setBeans(newBeans);
  };

  const removeBean = (beansIndex: number) => {
    const tempBeans = [...beans];
    tempBeans.splice(beansIndex, 1);
    setBeans(tempBeans);
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
              label="Bean Name"
              variant="outlined"
              type="text"
              value={bean.beanName}
              onChange={(e) => updateBeanName(index, e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              size="small"
              label="Amount (g)"
              variant="outlined"
              type="number"
              value={bean.beanAmount}
              onChange={(e) =>
                updateBeanAmount(index, parseInt(e.target.value))
              }
              sx={{ flexGrow: 1 }}
            />
            <div
              onClick={() => {
                removeBean(index);
              }}
            >
              X
            </div>
          </Box>
        ))}
        <Button
          disabled={beans.length >= 10}
          size="small"
          variant="outlined"
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

export { CreateRecipeCard };
