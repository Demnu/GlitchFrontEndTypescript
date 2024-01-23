import { Box, Button, Paper, TextField } from "@mui/material";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../myApi";
import { RecipeRequestDto } from "../../glitchHubApi";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const CreateRecipePage = () => {
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [selectedProduct, setSelectedProduct] = useState({
    label: "",
    value: "",
  });
  const [beans, setBeans] = useState([{ beanName: "", beanAmount: 0 }]);
  const [formattedProducts, setFormattedProducts] = useState<
    { label: string }[]
  >([]);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery(
    ["productsWithNoRecipes"],
    api.products.listProductsWithNoRecipesList,
    {
      refetchOnWindowFocus: false,
      refetchInterval: 300000,
    }
  );

  const handleSave = async () => {
    // check if there are bean amounts with 0 or less grams
    const hasInvalidAmount = beans.some((b) => b.beanAmount <= 0);
    // check if there are bean names that are empty
    const hasInvalidBeanName = beans.some((b) => b.beanName.length <= 0);
    if (
      (!hasInvalidAmount || !hasInvalidBeanName) &&
      !!products &&
      !!products.data
    ) {
      // get productId
      const product = products?.data.find(
        (p) => p.productName === selectedProduct.label
      );
      if (!!product) {
        let newBeans = [...beans];
        newBeans.forEach((bean) => {
          bean.beanName = bean.beanName.trim();
        });

        const recipe: RecipeRequestDto = {
          productId: product.id,
          recipeName: product.productName,
          beans: newBeans,
        };
        createRecipeMutation.mutate(recipe);
      }
    } else {
      setErrorMsg("Invalid bean name or bean amount");
    }
  };
  const addBeanClickHandler = () => {
    const newBeans = [...beans];
    newBeans.push({ beanName: "", beanAmount: 0 });
    setErrorMsg(null);
    setBeans(newBeans);
  };

  const updateBeanName = (index: number, newName: string) => {
    const newBeans = [...beans];
    newBeans[index]["beanName"] = newName;
    setErrorMsg(null);
    setBeans(newBeans);
  };

  const updateBeanAmount = (index: number, newAmount: number) => {
    const newBeans = [...beans];
    newBeans[index]["beanAmount"] = newAmount;
    setErrorMsg(null);
    setBeans(newBeans);
  };

  const removeBean = (beansIndex: number) => {
    const tempBeans = [...beans];
    tempBeans.splice(beansIndex, 1);
    setErrorMsg(null);
    setBeans(tempBeans);
  };

  //useEffect to format the products with no recipes for autoComplete
  useEffect(() => {
    if (!!products && !!products.data) {
      const formattedProducts = products?.data.map((p) => ({
        label: p.productName,
        value: p.id,
      }));
      setFormattedProducts(formattedProducts);
    }
  }, [isLoading, products]);
  const createRecipeMutation = useMutation({
    mutationFn: (newRecipe: RecipeRequestDto) => {
      return api.recipes.createRecipeCreate(newRecipe);
    },
    onError: () => {
      setErrorMsg("The recipe could not be saved");
    },
    onSuccess: () => {
      setBeans([{ beanName: "", beanAmount: 0 }]);
      setSelectedProduct({ label: "", value: "" });
      refetch();
    },
  });

  return (
    <Paper
      sx={{
        width: "30rem",
        p: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box sx={{ fontSize: "24px", mb: "1rem" }}>Create a new recipe</Box>
      <Box zIndex={2}>
        <Select
          value={selectedProduct}
          onChange={(e) => {
            if (!!e) {
              setSelectedProduct({ label: e.label, value: e.value });
            }
          }}
          options={formattedProducts}
        />
      </Box>
      <Box zIndex={1}>
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
      </Box>

      {!!errorMsg && <Box sx={{ color: "red" }}>{errorMsg}</Box>}
      <Button variant="outlined" color="info" onClick={addBeanClickHandler}>
        Add bean
      </Button>

      <Box sx={{ gap: "1rem", display: "flex" }}>
        <Button variant="contained" onClick={handleSave}>
          Create Recipe
        </Button>
      </Box>
    </Paper>
  );
};
export { CreateRecipePage };
