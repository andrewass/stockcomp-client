import React, {useContext} from "react";
import {UserContext} from "../../../../context/UserContext";
import {useHistory} from "react-router-dom";
import {signUpForContest} from "../../../../service/contestService";

const ActiveContest = ({contest}) => {

    const ongoingContest = "Ongoing contest";
    const upcomingContest = "Starting " + contest.startTime;

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

    const renderSignedUpStatus = () => {
        return contest.userParticipating ? "Signed up"
            : <button onClick={() => handleContestSignUp(contest.contestNumber)}>Sign up</button>;
    }

    return (
        <ul className="upcomingContest">
            <li>Contest number {contest.contestNumber}</li>
            <li>{contest.running ? ongoingContest : upcomingContest}</li>
            <li>{renderSignedUpStatus()}</li>
        </ul>
    );
}

export default ActiveContest;