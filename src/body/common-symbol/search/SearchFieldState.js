import {useState} from "react";
import {getSuggestionsFromQuery} from "../../../service/symbolService";

const SearchFieldState = () => {

    const [query, setQuery] = useState("");
    const [suggestionList, setSuggestionList] = useState([]);

    const getSuggestions = async (query) => {
        if (query === "") {
            setSuggestionList([]);
        } else {
            let response = await getSuggestionsFromQuery(query)
            setSuggestionList(response.data);
        }
    };

    return {
        getSuggestions, suggestionList, setSuggestionList, query, setQuery
    }
}

export default SearchFieldState;
