import React from "react";
import UpcomingContestsState from "./UpcomingContestsState";

const UpcomingContest = ({contest}) => {

    const ongoingContest = "Ongoing contest";
    const upcomingContest = "Starting " + contest.startTime;

    const {handleContestSignUp} = UpcomingContestsState();

    const renderSignedUpStatus = () => {
        return contest.userIsParticipating ? "Signed up"
            : <button onClick={() => handleContestSignUp(contest.contestNumber)}>Sign up</button>;
    }

    return (
        <ul className="upcomingContest">
            <li>Contest number {contest.contestNumber}</li>
            <li>{contest.inRunningMode ? ongoingContest : upcomingContest}</li>
            <li>{renderSignedUpStatus()}</li>
        </ul>
    );
}

export default UpcomingContest;