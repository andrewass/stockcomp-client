import {UserContext} from "../../../context/UserContext";
import {useContext, useState} from "react";
import {getUpcomingContests, signUpForContest} from "../../../service/contestService";
import {useHistory} from "react-router-dom";

const UpcomingContestsState = () => {

    const {isSignedIn} = useContext(UserContext);
    const history = useHistory();
    const [upcomingContests, setUpcomingContests] = useState([]);

    const handleContestSignUp = (contestNumber) => {
        if (isSignedIn) {
            signUpForContest(contestNumber)
                .then(() => history.push("/stocks"))
                .catch(error => console.log(error))
        } else {
            history.push("/sign-in");
        }
    }

    const fetchUpcomingContests = () => {
        getUpcomingContests()
            .then(response => setUpcomingContests(response.data))
            .catch(error => console.log(error))
    }

    return {
        fetchUpcomingContests, handleContestSignUp, upcomingContests
    }
}

export default UpcomingContestsState;