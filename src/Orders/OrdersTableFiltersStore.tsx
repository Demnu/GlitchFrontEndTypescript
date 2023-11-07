import { create } from "zustand";
interface OrdersTableFilersStore {
  hideCalculatedOrders: boolean;
  changeHideCalculatedOrders: () => void;
}

const useOrdersTableFiltersStore = create<OrdersTableFilersStore>((set) => ({
  hideCalculatedOrders: false,
  changeHideCalculatedOrders: () =>
    set((state) => ({ hideCalculatedOrders: !state.hideCalculatedOrders })),
}));

export { useOrdersTableFiltersStore };
