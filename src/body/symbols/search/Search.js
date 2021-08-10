import React, {useContext, useState} from "react";
import "../symbols.css";
import AutoSuggest from "react-autosuggest";
import SearchState from "./SearchState";
import searchIcon from "../../../icons/loupe.svg";
import {SymbolContext} from "../../../context/SymbolContext";
import {NavLink} from "react-router-dom";

const Search = () => {

    const [query, setQuery] = useState("");
    const {setSelectedSymbol} = useContext(SymbolContext);
    const {suggestionList, setSuggestionList, getSuggestions} = SearchState();

    const onSuggestionsFetchRequested = ({value}) => {
        if (!value) {
            setSuggestionList([]);
            return;
        }
        getSuggestions(value);
    }

    const renderSuggestion = suggestion => {
        return (
            <NavLink className="suggestion" to="/symbol-detail"
                     onClick={() => {
                         setSelectedSymbol(suggestion);
                         setQuery("");
                     }}>
                {suggestion.symbol} : {suggestion.description}
            </NavLink>
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
