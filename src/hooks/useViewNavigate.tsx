import { useNavigate } from "react-router-dom";
import { useDashboardLayoutStore } from "../DashboardLayout/DashboardLayoutStore";
import { RouteInfo } from "../routeStrings";

const useViewNavigate = () => {
  const { setTopBarTitle } = useDashboardLayoutStore();
  const navigate = useNavigate();
  const viewNavigate = (route: RouteInfo) => {
    setTopBarTitle(route.title);
    if (!document.startViewTransition) {
      navigate(route.path);
    } else {
      document.startViewTransition(() => {
        navigate(route.path);
      });
    }
  };

  return viewNavigate;
};

export { useViewNavigate };
