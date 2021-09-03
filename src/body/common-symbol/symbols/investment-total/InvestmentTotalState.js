import {useState} from "react";
import {getAllInvestmentsForContest} from "../../../../service/investmentService";

const InvestmentTotalState = (contests) => {

    const [investments, setInvestments] = useState([]);

    const getContestNumberOfParticipatingContest = () => {
        const contest = contests.find(contest => contest.userParticipating && contest.running);
        if (contest) {
            return contest.contestNumber;
        }
    }

    const populateInvestmentList = async () => {
        const contestNumber = getContestNumberOfParticipatingContest();
        if (contestNumber) {
            const fetchedInvestments = await getAllInvestmentsForContest(contestNumber);
            setInvestments(fetchedInvestments.data);
        }
    }

    return {
        populateInvestmentList, investments
    }
}

export default InvestmentTotalState;