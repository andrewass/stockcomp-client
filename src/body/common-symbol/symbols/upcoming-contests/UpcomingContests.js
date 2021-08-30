import React from "react";
import UpcomingContest from "./UpcomingContest";
import LoadingComponent from "../../../../util/LoadingComponent";

const UpcomingContests = ({constestList}) => {

    if (constestList === undefined) {
        return (<LoadingComponent/>);
    } else if (constestList.length === 0) {
        return (<p>No upcoming contests</p>);
    } else {
        return (
            <div id="upcomingContests">
                <ul id="contestList">
                    {constestList.map((contest) =>
                        <UpcomingContest key={contest.contestNumber} contest={contest}/>
                    )}
                </ul>
            </div>
        );
    }
}

export default UpcomingContests;