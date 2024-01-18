import { create } from "zustand";

interface RecipesFiltersStore {
  searchText: string;
  setSearchText: (text: string) => void;
  resetFilters: () => void;
}

const useRecipesFiltersStore = create<RecipesFiltersStore>((set) => ({
  searchText: "",
  setSearchText: (text) => set({ searchText: text }),
  resetFilters: () =>
    set({
      searchText: "",
    }),
}));

export { useRecipesFiltersStore };
