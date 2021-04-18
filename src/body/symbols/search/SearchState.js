import {useState} from "react";
import {getSuggestionsFromQuery} from "../../../service/symbolService";

const SearchState = () => {

    const [query, setQuery] = useState("");
    const [suggestionList, setSuggestionList] = useState([]);

    const updateQuery = (event) => {
        setQuery(event.target.value);
    };

    const getSuggestions = () => {
        if (query === "") {
            setSuggestionList([]);
        } else {
            getSuggestionsFromQuery(query)
                .then((response) => setSuggestionList(response.data))
                .catch((error) => console.log(error));
        }
    };

    return {
        updateQuery, getSuggestions, suggestionList, query, setQuery
    }
}

export default SearchState;
