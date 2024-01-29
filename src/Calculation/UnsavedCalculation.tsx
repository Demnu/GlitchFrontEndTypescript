import { Box, Button, Paper, TextField } from "@mui/material";
import { useCalculationStore } from "./CalculationStore";
import { useState } from "react";
import { CalculationTables } from "./CalculationTables";
import {
  SaveCalculationRequestDto,
  UnsavedCalculation,
} from "../../glitchHubApi";
import { api } from "../myApi";
import { MAX_INPUT_HEIGHT } from "../consts";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const UnsavedCalculationPage = () => {
  const { calculation } = useCalculationStore();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [author, setAuthor] = useState("");
  const [calculationTitle, setCalculationTitle] = useState("");

  const saveCalculationMutation = useMutation({
    mutationFn: (calculation: SaveCalculationRequestDto) => {
      return api.calculations.saveCalculationCreate(calculation);
    },
    onSuccess: (data) => {
      navigate("/calculations/calculation/" + data.data.calculationId);
    },
    onError: () => {
      setErrorMsg("Could not save calculation");
    },
  });

  const handleSave = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (calculation) {
      const request: SaveCalculationRequestDto = {
        author: author,
        calculationName: calculationTitle,
        ordersCalculatedInformation: calculation.ordersCalculatedInformation,
        beansTally: calculation.beansTally,
        productsTally: calculation.productsTally,
      };
      saveCalculationMutation.mutate(request);
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
      {!!errorMsg && (
        <Paper
          sx={{ color: "red", p: "1rem", fontWeight: "bold", fontSize: "18px" }}
        >
          {errorMsg}
        </Paper>
      )}
      <CalculationTables calculation={calculation} />
    </Box>
  );
};

export { UnsavedCalculationPage };
