import {useState} from "react";
import {getUpcomingContests} from "../../../../service/contestService";

const SymbolRightMenuState = () => {

    const [activeContest, setActiveContest] = useState();
    const [isLoading, setLoading] = useState(true);

    const getActiveContest = contests => {
        return contests.find(contest => contest.userParticipating && contest.running);
    }
    
    const fetchUpcomingContests = async () => {
        setLoading(true)
        let response = await getUpcomingContests();
        setActiveContest(getActiveContest(response.data));
        setLoading(false);
    }

    return{
        activeContest, fetchUpcomingContests, isLoading
    }
}

export default SymbolRightMenuState;