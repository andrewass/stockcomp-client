import {UserContext} from "../../../../context/UserContext";
import {useContext} from "react";
import {signUpForContest} from "../../../../service/contestService";
import {useHistory} from "react-router-dom";

const ActiveContestState = () => {

    const {isSignedIn} = useContext(UserContext);
    const history = useHistory();

    const handleContestSignUp = async (contestNumber) => {
        if (isSignedIn) {
            await signUpForContest(contestNumber)
            history.push("/stocks");
        } else {
            history.push("/sign-in");
        }
    }

    return {handleContestSignUp}
}

export default ActiveContestState;