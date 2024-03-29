interface RouteInfo {
  path: string;
  title: string;
}

const createRouteInfo = (route: string, title: string) => {
  const routeInfo: RouteInfo = { path: route, title: title };
  return routeInfo;
};

const ORDERS_PAGE_INFO: RouteInfo = { path: "/orders", title: "Orders" };
const CALCULATIONS_PAGE_INFO: RouteInfo = {
  path: "/calculations",
  title: "Calculations",
};

const BLENDS_PAGE_INFO: RouteInfo = {
  path: "/blends",
  title: "Blends",
};
const CREATE_BLEND_PAGE_INFO: RouteInfo = {
  path: "/createBlend",
  title: "Create Blend",
};

const RECIPES_PAGE_INFO: RouteInfo = { path: "/recipes", title: "Recipes" };
const CREATE_RECIPE_PAGE_INFO: RouteInfo = {
  path: "/createRecipe",
  title: "Create Recipe",
};

const LOGOUT_PAGE_INFO: RouteInfo = { path: "/", title: "Logout" };

const UNSAVED_CALCULATION_PAGE_INFO: RouteInfo = {
  path: "/unsavedCalculation",
  title: "Calculation",
};

export {
  createRouteInfo,
  ORDERS_PAGE_INFO,
  CALCULATIONS_PAGE_INFO,
  RECIPES_PAGE_INFO,
  LOGOUT_PAGE_INFO,
  UNSAVED_CALCULATION_PAGE_INFO,
  CREATE_RECIPE_PAGE_INFO,
  BLENDS_PAGE_INFO,
  CREATE_BLEND_PAGE_INFO,
};
export type { RouteInfo };
