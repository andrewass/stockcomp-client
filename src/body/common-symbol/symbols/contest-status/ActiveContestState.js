import {UserContext} from "../../../../context/UserContext";
import {useContext} from "react";
import {signUpForContest} from "../../../../service/contestService";
import {useHistory} from "react-router-dom";

const ActiveContestState = () => {

    const {isSignedIn} = useContext(UserContext);
    const history = useHistory();

    const handleContestSignUp = (contestNumber) => {
        if (isSignedIn) {
            signUpForContest(contestNumber)
                .then(() => history.push("/stocks"))
                .catch(error => console.log(error))
        } else {
            history.push("/sign-in");
        }
    }

    return {handleContestSignUp}
}

export default ActiveContestState;