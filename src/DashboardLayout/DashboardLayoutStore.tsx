import { create } from "zustand";
import {
  closedDrawerWidth,
  extendedDrawerWidth,
} from "./dashboardLayoutConstants";

interface DashboardLayoutStore {
  drawerState: "open" | "closed" | "mobile";
  currentDrawerWidth: string;
  topBarTitle: string;
  setTopBarTitle: (value: string) => void;
  setDrawerState: (value: "open" | "closed" | "mobile") => void;
}

const useDashboardLayoutStore = create<DashboardLayoutStore>((set) => ({
  drawerState: "open",
  topBarTitle: "Orders",
  currentDrawerWidth: extendedDrawerWidth,
  setTopBarTitle: (value) => {
    set({ topBarTitle: value });
  },
  setDrawerState: (value) => {
    set({
      drawerState: value,
      currentDrawerWidth:
        value === "mobile"
          ? "0px"
          : value === "open"
          ? extendedDrawerWidth
          : closedDrawerWidth,
    });
  },
}));

export { useDashboardLayoutStore };
