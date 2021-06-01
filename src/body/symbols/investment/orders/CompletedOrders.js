import Order from "./Order";

const CompletedOrders = ({completedOrders}) => {

    return (
        <div className="orderList">
            <h3>Completed Orders : </h3>
            <ul>
                {completedOrders.map((order) =>
                    <Order order={order} key={order.orderId} />
                )}
            </ul>
        </div>
    );
}

export default CompletedOrders;