const CompletedOrders = ({completedOrders}) => {

    return (
        <ul>
            {completedOrders.map((order) =>
                <li key={order.orderId}>A-COMPLETED-ORDER</li>
            )}
        </ul>
    );
}

export default CompletedOrders;