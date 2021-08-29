import Order from "./Order";
import {deleteActiveOrder} from "../../../service/investmentOrderService";

const ActiveOrders = ({activeOrders, populateOrderList}) => {

    const deleteOrder = async (orderId) => {
        await deleteActiveOrder(orderId);
        await populateOrderList();
    }

    return (
        <div className="orderList">
            <h3>Active Orders : </h3>
            <ul>
                {activeOrders.map((order) =>
                    <Order order={order} key={order.orderId} deleteOrder={deleteOrder} />
                )}
            </ul>
        </div>
    );
}

export default ActiveOrders;