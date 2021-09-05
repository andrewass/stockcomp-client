import OrderList from "./OrderList";

const CompletedOrders = ({completedOrders}) => {

    return (
        <div id="CompletedOrders">
            <h3>Completed Orders : </h3>
            <OrderList orders={completedOrders}/>
        </div>
    );
}

export default CompletedOrders;