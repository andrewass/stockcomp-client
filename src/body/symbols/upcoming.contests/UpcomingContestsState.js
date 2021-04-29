import {UserContext} from "../../../context/UserContext";
import {useContext, useState} from "react";
import {getUpcomingContests} from "../../../service/contestService";

const UpcomingContestsState = () => {

    const {isSignedIn} = useContext(UserContext);

    const [upcomingContests, setUpcomingContests] = useState([]);


    const fetchUpcomingContests = () => {
        getUpcomingContests()
            .then(response => setUpcomingContests(response.data))
            .catch(error => console.log(error))
    }

    return{
        fetchUpcomingContests, upcomingContests
    }
}

export default UpcomingContestsState;