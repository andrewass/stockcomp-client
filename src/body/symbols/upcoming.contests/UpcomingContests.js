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
            <div>
                <p>Upcoming contests :</p>
                <ul id="contestList">
                    {upcomingContests.map((contest) =>
                        <UpcomingContest contest={contest}/>
                    )}
                </ul>
            </div>
        );
    }
}

export default UpcomingContests;