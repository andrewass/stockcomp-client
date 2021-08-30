import {useState} from "react";
import {getUpcomingContests} from "../../../service/contestService";

const SymbolsState = () => {

    const [contestList, setContestList] = useState([]);

    const fetchUpcomingContests = () => {
        getUpcomingContests()
            .then(response => setContestList(response.data))
            .catch(error => console.log(error))
    }

    return{
        contestList, fetchUpcomingContests
    }
}

export default SymbolsState;