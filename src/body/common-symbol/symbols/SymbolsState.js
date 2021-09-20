import {useState} from "react";
import {getUpcomingContests} from "../../../service/contestService";

const SymbolsState = () => {

    const [contests, setContests] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchUpcomingContests = async () => {
        setLoading(true);
        let response = await getUpcomingContests()
        setContests(response.data);
        setLoading(false);
    }

    return{
        contests, fetchUpcomingContests, isLoading
    }
}

export default SymbolsState;