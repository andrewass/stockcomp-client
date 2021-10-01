import React, {useContext, useEffect, useState} from "react";
import AutoSuggest from "react-autosuggest";
import {SymbolContext} from "../../../context/SymbolContext";
import {NavLink} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import "./searchBar.css";
import {getSuggestionsFromQuery} from "../../../service/symbolService";

const SearchField = () => {

    const {selectedSymbol, setSelectedSymbol} = useContext(SymbolContext);
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
            <SearchIcon/>
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
