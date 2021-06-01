import {useState} from "react";

const OrderState = (order) => {

    const [completedAmount, setCompletedAmount] = useState(order.totalAmount - order.remainingAmount);

    const deleteOrder = () => {
        console.log("Deleting order "+order.orderId);
    }

    return{
        completedAmount, deleteOrder
    }
}

export default OrderState;