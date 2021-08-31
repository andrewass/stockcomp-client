import React from "react";
import ActiveContest from "./ActiveContest";
import LoadingComponent from "../../../../util/LoadingComponent";

const ContestStatus = ({constestList}) => {

    if (constestList === undefined) {
        return (<LoadingComponent/>);
    } else if (constestList.length === 0) {
        return (<p>No upcoming contests</p>);
    } else {
        return (
            <div id="upcomingContests">
                <ul id="contestList">
                    {constestList.map((contest) =>
                        <ActiveContest key={contest.contestNumber} contest={contest}/>
                    )}
                </ul>
            </div>
        );
    }
}

export default ContestStatus;