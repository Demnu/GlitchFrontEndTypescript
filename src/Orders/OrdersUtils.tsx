import { OrderStatusEnum } from "../../glitchHubApi";

function formatOrderStatus(status: OrderStatusEnum): string {
  switch (status.orderStatus) {
    case "notCalculated":
      return "Not Calculated";
    case "calculated":
      return "Calculated";
    default:
      return "Unknown Status";
  }
}

export { formatOrderStatus };
