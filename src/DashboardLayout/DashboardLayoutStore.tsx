import { create } from "zustand";
import {
  extendedDrawerWidth,
  closedDrawerWidth,
} from "./dashboardLayoutConstants";
import { isMobile } from "../utils/isMobile";

interface DashboardLayoutStore {
  drawerState: "open" | "closed";
  currentDrawerWidth: string;
  topBarTitle: string;
  setTopBarTitle: (value: string) => void;
  setDrawerState: (value: "open" | "closed") => void;
  refreshOnScreenSizeChange: () => void;
}

const useDashboardLayoutStore = create<DashboardLayoutStore>((set, get) => ({
  drawerState: "open",
  topBarTitle: "Orders",
  currentDrawerWidth: extendedDrawerWidth,
  setTopBarTitle: (value) => {
    set({ topBarTitle: value });
  },
  setDrawerState: (value) => {
    const isMobileDevice = isMobile();
    const newClosedDrawerWidth = isMobileDevice ? "0px" : closedDrawerWidth;
    console.log(value);

    set({
      drawerState: value,
      currentDrawerWidth:
        value === "open" ? extendedDrawerWidth : newClosedDrawerWidth,
    });
  },
  refreshOnScreenSizeChange: () => {
    const { drawerState } = get();
    const isMobileDevice = isMobile();
    const newClosedDrawerWidth = isMobileDevice ? "0px" : closedDrawerWidth;
    set({
      drawerState: drawerState,
      currentDrawerWidth:
        drawerState === "open" ? extendedDrawerWidth : newClosedDrawerWidth,
    });
  },
}));

export { useDashboardLayoutStore };
