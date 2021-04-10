import {useState} from "react";
import symbolService from "../../../service/symbolService";

const SearchComponentState = () => {

    const [query, setQuery] = useState("");
    const [suggestionList, setSuggestionList] = useState([]);

    const updateQuery = (event) => {
        setQuery(event.target.value);
    };

    const getSuggestions = () => {
        if (query === "") {
            setSuggestionList([]);
        } else {
            symbolService.getSuggestions(query)
                .then((response) => setSuggestionList(response.data))
                .catch((error) => console.log(error));
        }
    };

    return {
        updateQuery, getSuggestions, suggestionList, query
    }
}

export default SearchComponentState;
