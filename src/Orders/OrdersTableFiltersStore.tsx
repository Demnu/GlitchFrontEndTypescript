import dayjs from "dayjs";
import { create } from "zustand";

interface OrdersTableFiltersStore {
  hideCalculatedOrders: boolean;
  dateFrom: Date;
  dateTo: Date;
  searchText: string;
  changeHideCalculatedOrders: () => void;
  setDateFrom: (date: Date) => void;
  setDateTo: (date: Date) => void;
  setSearchText: (text: string) => void;
  resetFilters: () => void;
}

const useOrdersTableFiltersStore = create<OrdersTableFiltersStore>((set) => ({
  hideCalculatedOrders: false,
  dateFrom: dayjs().subtract(14, "day").startOf("day").toDate(),
  dateTo: dayjs().endOf("day").toDate(),
  searchText: "",

  changeHideCalculatedOrders: () =>
    set((state) => ({ hideCalculatedOrders: !state.hideCalculatedOrders })),
  setDateFrom: (date) => set({ dateFrom: date }),
  setDateTo: (date) => set({ dateTo: date }),
  setSearchText: (text) => set({ searchText: text }),
  resetFilters: () =>
    set({
      hideCalculatedOrders: false,
      dateFrom: dayjs().subtract(14, "day").startOf("day").toDate(),
      dateTo: dayjs().endOf("day").toDate(),
      searchText: "",
    }),
}));

export { useOrdersTableFiltersStore };
