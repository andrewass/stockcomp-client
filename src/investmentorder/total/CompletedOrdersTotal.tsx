import { CompletedOrders } from "../CompletedOrders";
import { InvestmentOrder } from "../../domain/investmentorder/investmentOrderTypes";

export const CompletedOrdersTotal = ({
  completedOrders,
}: {
  completedOrders: InvestmentOrder[];
}) => {
  return <CompletedOrders completedOrders={completedOrders} />;
};
