import React, {useEffect, useState} from "react";
import Investments from "../../investment/Investments";
import {getAllInvestmentsForContest} from "../../../../service/investmentService";


const InvestmentTotal = ({contest}) => {

    const [investments, setInvestments] = useState([]);

    const populateInvestmentList = async () => {
        if (contest) {
            const fetchedInvestments = await getAllInvestmentsForContest(contest.contestNumber);
            setInvestments(fetchedInvestments.data);
        }
    }

    useEffect(() => {
        populateInvestmentList()
            .catch(error => console.log(error));
    }, []);

    return (
        <Investments investments={investments}/>
    );
}

export default InvestmentTotal;