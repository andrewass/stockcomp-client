import {useState} from "react";
import {getUpcomingContests} from "../../../../service/contestService";
import {getAllInvestmentsForContest} from "../../../../service/investmentService";

const InvestmentTotalState = () => {

    const [investments, setInvestments] = useState([]);

    const getContestNumberOfParticipatingContest = (contests) => {
        const contest = contests.find(contest => contest.userParticipating && contest.running);
        if (contest) {
            return contest.contestNumber;
        }
    }

    const populateInvestmentList = async () => {
        const contests = await getUpcomingContests();
        const contestNumber = getContestNumberOfParticipatingContest(contests.data);
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