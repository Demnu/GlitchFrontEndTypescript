const isMobile = () => {
  const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
  return isMobileDevice;
};
export { isMobile };
