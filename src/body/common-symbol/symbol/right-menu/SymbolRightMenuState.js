import {useState} from "react";
import {getUpcomingContests} from "../../../../service/contestService";

const SymbolRightMenuState = () => {

    const [activeContest, setActiveContest] = useState();
    const [isLoading, setLoading] = useState(true);

    const getActiveContest = contests => {
        return contests.find(contest => contest.userParticipating && contest.running);
    }
    
    const fetchUpcomingContests = () => {
        getUpcomingContests()
            .then(response => {
                setActiveContest(getActiveContest(response.data));
                setLoading(false);
            })
            .catch(error => console.log(error))
    }

    return{
        activeContest, fetchUpcomingContests, isLoading
    }
}

export default SymbolRightMenuState;