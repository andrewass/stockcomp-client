import React, {useContext, useEffect} from "react";
import AutoSuggest from "react-autosuggest";
import SearchFieldState from "./SearchFieldState";
import searchIcon from "../../../icons/loupe.svg";
import {SymbolContext} from "../../../context/SymbolContext";
import {NavLink} from "react-router-dom";
import "./searchBar.css";

const SearchField = () => {

    const {selectedSymbol, setSelectedSymbol} = useContext(SymbolContext);
    const {suggestionList, setSuggestionList, getSuggestions, query, setQuery} = SearchFieldState();

    useEffect(() => setQuery(""), [selectedSymbol]);

    const onSuggestionsFetchRequested = ({value}) => {
        if (!value) {
            setSuggestionList([]);
            return;
        }
        getSuggestions(value).catch(error => console.log(error));
    }

    const renderSuggestion = suggestion => {
        return (
            <NavLink className="suggestion" to="/symbol-detail" onClick={() => setSelectedSymbol(suggestion)}>
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

export default SearchField;
