import { useNavigate } from "react-router-dom";

const useViewNavigate = () => {
  const navigate = useNavigate();

  const viewNavigate = (route: string) => {
    if (!document.startViewTransition) {
      navigate(route);
    } else {
      document.startViewTransition(() => {
        navigate(route);
      });
    }
  };

  return viewNavigate;
};

export { useViewNavigate };
