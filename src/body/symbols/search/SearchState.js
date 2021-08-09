import {useState} from "react";
import {getSuggestionsFromQuery} from "../../../service/symbolService";

const SearchState = () => {

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
        getSuggestions, suggestionList, setSuggestionList
    }
}

export default SearchState;
