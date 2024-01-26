import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../../myApi";
import { useEffect, useState } from "react";
import { SavedCalculationDto } from "../../../glitchHubApi";
import { Box, Paper } from "@mui/material";
import { CalculationTables } from "../CalculationTables";

const SavedCalculation = () => {
  const { calculationId } = useParams();
  const [calculation, setCalculation] = useState<SavedCalculationDto | null>(
    null
  );
  const {
    data: calculations,
    isLoading,
    refetch,
  } = useQuery(["calculations"], api.calculations.listCalculationsList, {
    refetchOnWindowFocus: false,
    refetchInterval: 300000,
  });

  // useEffect to load the calculation
  useEffect(() => {
    if (!!calculations && !!calculations.data && !isLoading) {
      const calc = calculations.data.find(
        (c) => c.id.toString() === calculationId
      );
      if (!!calc) {
        setCalculation(calc);
      }
    }
  }, [calculations, isLoading]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
      {!!calculation && (
        <Paper sx={{ display: "flex", p: "0.5rem", gap: "0.2rem" }}>
          <Box sx={{ fontWeight: "bold" }}> Calculation: </Box>{" "}
          <Box sx={{ mr: "0.5rem" }}>{calculation.calculationName}</Box>
          <Box sx={{ fontWeight: "bold" }}>Author:</Box> {calculation.author}
        </Paper>
      )}
      <Box height={"2rem"}></Box>
      <CalculationTables calculation={calculation} />
    </Box>
  );
};
export { SavedCalculation };
