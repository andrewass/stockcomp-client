import type { InvestmentOrder } from "../../domain/investmentorder/investmentOrderTypes";
import { CompletedOrders } from "../CompletedOrders";

export const CompletedOrdersTotal = ({
	completedOrders,
}: {
	completedOrders: InvestmentOrder[];
}) => {
	return <CompletedOrders completedOrders={completedOrders} />;
};
