import { Box, Button, Dialog, Paper, TextField } from "@mui/material";
import { DeleteRecipeRequestDto, RecipeDto } from "../../../glitchHubApi";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { EditRecipeRequestDto } from "../../../glitchHubApi";

import { api } from "../../myApi";

interface EditRecipeProps {
  recipe: RecipeDto | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const EditRecipe = ({ recipe, isOpen, onClose, refetch }: EditRecipeProps) => {
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [beans, setBeans] = useState([{ beanName: "", beanAmount: 0 }]);
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

  const handleUpdate = () => {
    //check if bean name or bean amount is invalid
    const hasInvalidAmount = beans.some((b) => b.beanAmount <= 0);
    // check if there are bean names that are empty
    const hasInvalidBeanName = beans.some((b) => b.beanName.length <= 0);

    if (!hasInvalidAmount && !hasInvalidBeanName) {
      if (!!recipe) {
        const editRecipeRequest: EditRecipeRequestDto = {
          recipeId: recipe.id,
          beans: beans,
        };
        editRecipeMutation.mutate(editRecipeRequest);
      }
    } else {
      setErrorMsg("Invalid bean name or amount");
    }
  };

  const handleDelete = () => {
    if (!!recipe) {
      const deleteRecipeRequest: DeleteRecipeRequestDto = {
        recipeId: recipe.id,
      };
      deleteRecipeMutation.mutate(deleteRecipeRequest);
    }
  };
  useEffect(() => {
    const tempBeans =
      recipe?.recipe_beans?.map((rb) => ({
        beanName: rb.bean.beanName,
        beanAmount: rb.amountOrdered,
      })) ?? [];

    setBeans(tempBeans);
  }, [recipe]);

  const editRecipeMutation = useMutation({
    mutationFn: (editRecipe: EditRecipeRequestDto) => {
      return api.recipes.editRecipeCreate(editRecipe);
    },
    onError: () => {
      setErrorMsg("Recipe was not updated");
    },
    onSuccess: () => {
      refetch();
      onClose();
    },
  });

  const deleteRecipeMutation = useMutation({
    mutationFn: (deleteRecipeRequest: DeleteRecipeRequestDto) => {
      return api.recipes.deleteRecipeDelete(deleteRecipeRequest);
    },
    onError: () => {
      setErrorMsg("Recipe was not deleted");
    },
    onSuccess: () => {
      refetch();
      onClose();
    },
  });
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Paper sx={{ p: "1rem" }}>
        {!!recipe && (
          <Box sx={{ fontSize: "24px", mb: "1rem" }}>{recipe.recipeName}</Box>
        )}
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
          <Box sx={{ color: "red" }}>{errorMsg}</Box>
          <Button variant="outlined" color="info" onClick={addBeanClickHandler}>
            Add bean
          </Button>
          <Box></Box>
        </Box>
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{ width: "100%", mt: "1rem" }}
        >
          Edit Recipe
        </Button>
        <Button
          variant="outlined"
          onClick={handleDelete}
          color="error"
          sx={{ width: "100%", mt: "1rem" }}
        >
          Delete Recipe
        </Button>
      </Paper>
    </Dialog>
  );
};

export { EditRecipe };
