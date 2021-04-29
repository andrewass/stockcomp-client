import React from "react";

const UpcomingContest = ({contest}) => {

    const ongoingContest = "Ongoing contest";

    const upcomingContest = "Starting " + contest.startTime;


    return (
        <ul className="upcomingContest">
            <li>{contest.inRunningMode ? ongoingContest : upcomingContest}</li>
            <li></li>
        </ul>
    );
}

export default UpcomingContest;