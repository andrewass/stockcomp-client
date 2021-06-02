import Order from "./Order";

const ActiveOrders = ({activeOrders, deleteOrder}) => {

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