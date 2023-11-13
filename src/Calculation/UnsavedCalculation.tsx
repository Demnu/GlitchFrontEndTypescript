import { Box, Button, Paper, TextField } from "@mui/material";
import { useCalculationStore } from "./CalculationStore";
import { useEffect, useState } from "react";
import { useViewNavigate } from "../hooks/useViewNavigate";
import { ORDERS_PAGE_INFO } from "../routeStrings";
import { CalculationTables } from "./CalculationTables";
import {
  SaveCalculationRequestDto,
  UnsavedCalculation,
} from "../../glitchHubApi";
import { api } from "../myApi";
import { MAX_INPUT_HEIGHT } from "../consts";

const saveCalculation = async (
  author: string,
  calculationTitle: string,
  calculation: UnsavedCalculation
) => {
  const request: SaveCalculationRequestDto = {
    author: author,
    calculationName: calculationTitle,
    ordersCalculatedInformation: calculation.ordersCalculatedInformation,
    beansTally: calculation.beansTally,
    productsTally: calculation.productsTally,
  };
  return await api.calculations.saveCalculationCreate(request);
};

const UnsavedCalculationPage = () => {
  const { calculation } = useCalculationStore();
  const viewNavigate = useViewNavigate();
  const [author, setAuthor] = useState("");
  const [calculationTitle, setCalculationTitle] = useState("");

  useEffect(() => {
    if (!calculation) {
      viewNavigate(ORDERS_PAGE_INFO);
    } else {
      console.log(calculation);
    }
  }, [calculation, viewNavigate]);

  const handleSave = async () => {
    if (calculation) {
      await saveCalculation(author, calculationTitle, calculation);
      // Implement post-save logic (like redirecting or showing a message)
    }
  };

  return (
    <Box
      sx={{
        flexGrow: "1",
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <Paper
        component="form"
        sx={{ py: "1rem", px: "0.5rem", display: "flex", gap: "1rem" }}
        noValidate
      >
        <TextField
          sx={{ height: MAX_INPUT_HEIGHT }}
          autoComplete="on"
          size="small"
          required
          id="author"
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          autoComplete="off"
          sx={{ height: MAX_INPUT_HEIGHT }}
          size="small"
          required
          id="calculation-title"
          label="Calculation Title"
          value={calculationTitle}
          onChange={(e) => setCalculationTitle(e.target.value)}
        />
        <Button
          type="submit"
          disabled={!author || !calculationTitle || !calculation}
          variant={
            !author || !calculationTitle || !calculation
              ? "outlined"
              : "contained"
          }
          onClick={handleSave}
        >
          Save Calculation
        </Button>
      </Paper>
      <CalculationTables calculation={calculation} />
    </Box>
  );
};

export { UnsavedCalculationPage };
