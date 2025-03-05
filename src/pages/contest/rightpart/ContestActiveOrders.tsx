import {InvestmentOrder} from "../../../domain/investmentorder/investmentOrderTypes";

interface Props {
    orders: InvestmentOrder[]
}

export default function ContestActiveOrders({orders}: Props) {
    return (
        <div>
            ContestActiveOrders
        </div>
    );
}
