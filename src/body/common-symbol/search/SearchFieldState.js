import {useState} from "react";
import {getSuggestionsFromQuery} from "../../../service/symbolService";

const SearchFieldState = () => {

    const [query, setQuery] = useState("");
    const [suggestionList, setSuggestionList] = useState([]);

    const getSuggestions = (query) => {
        if (query === "") {
            setSuggestionList([]);
        } else {
            getSuggestionsFromQuery(query)
                .then((response) => setSuggestionList(response.data))
                .catch((error) => console.log(error));
        }
    };

    return {
        getSuggestions, suggestionList, setSuggestionList, query, setQuery
    }
}

export default SearchFieldState;
