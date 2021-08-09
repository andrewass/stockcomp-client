import React, {useState} from "react";
import "../symbols.css";
import AutoSuggest from "react-autosuggest";
import SearchState from "./SearchState";
import searchIcon from "../../../icons/loupe.svg";

const Search = () => {

    const [query, setQuery] = useState("");

    const {suggestionList, setSuggestionList, getSuggestions} = SearchState();

    const onSuggestionsFetchRequested = ({value}) => {
        if (!value) {
            setSuggestionList([]);
            return;
        }
        getSuggestions(value)
    }

    const renderSuggestion = suggestion => {
        return (
            <div>
                <span>{suggestion.symbol} : {suggestion.description}</span>
            </div>
        );
    }

    const inputProps = {
        value: query,
        onChange: (event, {newValue}) => setQuery(newValue)
    }

    return (
        <div id="searchField">
            <img src={searchIcon} id="searchIcon" alt="Search icon"/>
            <AutoSuggest
                suggestions={suggestionList}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={() => setSuggestionList([])}
                getSuggestionValue={suggestion => suggestion.description}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        </div>
    );
}

export default Search;
