import {deleteActiveOrder} from "../../../service/investmentOrderService";
import OrderList from "./OrderList";

const ActiveOrders = ({activeOrders, populateOrderList}) => {

    const deleteOrder = async (orderId) => {
        await deleteActiveOrder(orderId);
        await populateOrderList();
    }

    return (
        <div id="activeOrders">
            <h3>Active Orders : </h3>
            <OrderList orders={activeOrders} deleteOrder={deleteOrder}/>
        </div>
    );
}

export default ActiveOrders;