import React, {useEffect} from "react";
import UpcomingContestsState from "./UpcomingContestsState";
import UpcomingContest from "./UpcomingContest";
import LoadingComponent from "../../../common/LoadingComponent";

const UpcomingContests = () => {

    const {fetchUpcomingContests, upcomingContests} = UpcomingContestsState();

    useEffect(() => {
        fetchUpcomingContests();
    }, []);

    if (upcomingContests === undefined) {
        return (<LoadingComponent/>);
    } else if (upcomingContests.length === 0) {
        return (<p>No upcoming contests</p>);
    } else {
        return (
            <div id="upcomingContests">
                <ul id="contestList">
                    {upcomingContests.map((contest) =>
                        <UpcomingContest key={contest.contestNumber} contest={contest}/>
                    )}
                </ul>
            </div>
        );
    }
}

export default UpcomingContests;