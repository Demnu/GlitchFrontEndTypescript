import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../../myApi";
import { useEffect, useState } from "react";
import { SavedCalculationDto } from "../../../glitchHubApi";
import { Box } from "@mui/material";

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
    <>
      Saved Calculation {calculationId}
      {!!calculation && (
        <Box>
          {calculation.author}, {calculation.calculationName}
        </Box>
      )}
    </>
  );
};
export { SavedCalculation };
