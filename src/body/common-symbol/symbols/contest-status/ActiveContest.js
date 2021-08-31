import React from "react";
import ContestStatusState from "./ActiveContestState";

const ActiveContest = ({contest}) => {

    const ongoingContest = "Ongoing contest";
    const upcomingContest = "Starting " + contest.startTime;

    const {handleContestSignUp} = ContestStatusState();

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