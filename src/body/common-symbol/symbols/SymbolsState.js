import {useState} from "react";
import {getUpcomingContests} from "../../../service/contestService";

const SymbolsState = () => {

    const [contests, setContests] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchUpcomingContests = () => {
        getUpcomingContests()
            .then(response => {
                setContests(response.data);
                setLoading(false);
            })
            .catch(error => console.log(error))
    }

    return{
        contests, fetchUpcomingContests, isLoading
    }
}

export default SymbolsState;