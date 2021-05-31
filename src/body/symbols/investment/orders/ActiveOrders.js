const ActiveOrders = ({activeOrders}) => {

    return (
        <ul>
            {activeOrders.map((order) =>
                <li key={order.orderId}>AN-ACTIVE-ORDER</li>
            )}
        </ul>
    );
}

export default ActiveOrders;