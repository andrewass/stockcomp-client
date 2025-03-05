import {InvestmentOrder} from "../../../domain/investmentorder/investmentOrderTypes";

interface Props{
    orders: InvestmentOrder[]
}

export default function ContestCompletedOrders({orders}: Props) {
    return (
        <div>
            ContestCompletedOrders
        </div>
    );
}
