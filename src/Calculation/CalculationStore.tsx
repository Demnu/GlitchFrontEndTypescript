import { create } from "zustand";
import { MakeCalculationResponseDto } from "../../glitchHubApi";

interface CalculationStore {
  calculation: MakeCalculationResponseDto | null;
  setCalculation: (calculation: MakeCalculationResponseDto) => void;
}

const useCalculationStore = create<CalculationStore>((set) => ({
  calculation: null,
  setCalculation: (calculation) => {
    set({ calculation: calculation });
  },
}));

export { useCalculationStore };
