import type { InvestmentOrder } from "../../../domain/investmentorder/investmentOrderTypes";
import { CompletedOrders } from "../../../investmentorder/CompletedOrders";

export default function CompletedOrdersSymbol({
	completedOrders,
}: {
	completedOrders: InvestmentOrder[];
}) {
	return <CompletedOrders completedOrders={completedOrders} />;
}
