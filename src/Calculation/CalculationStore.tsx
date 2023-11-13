import { create } from "zustand";
import { Calculation } from "../../glitchHubApi";

interface CalculationStore {
  calculation: Calculation | null;
  setCalculation: (calculation: Calculation) => void;
}

const useCalculationStore = create<CalculationStore>((set) => ({
  calculation: null,
  setCalculation: (calculation) => {
    set({ calculation: calculation });
  },
}));

export { useCalculationStore };
