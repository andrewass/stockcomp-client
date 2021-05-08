import {useState} from "react";

const TransactionState = () => {

    const [remainingFunds, setRemainingFunds] = useState();
    const [amountInvested, setAmountInvested] = useState(0) ;

    const fetchParticipantData = () => {
        fetchRemainingFunds();
        fetchAmountInvested();
    }

    const fetchRemainingFunds = () => {

    }

    const fetchAmountInvested = () => {

    }

    return{
        fetchParticipantData,remainingFunds, amountInvested
    }
}

export default TransactionState;

