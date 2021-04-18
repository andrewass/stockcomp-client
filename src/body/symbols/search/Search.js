import React, {useEffect} from "react";
import "../symbols.css";
import SuggestionList from "./SuggestionList";
import SearchState from "./SearchState";
import searchIcon from "../../../icons/loupe.svg";

const Search = () => {

    const {
        setQuery, query, updateQuery, suggestionList, getSuggestions
    } = SearchState();

    useEffect(() => {
        getSuggestions();
    }, [query]);

    return (
        <div id="searchComponent">
            <div id="searchField">
                <img src={searchIcon} id="searchIcon" alt="Search icon"/>
                <input id="query" type="text" value={query} onChange={updateQuery}/>
            </div>
            <SuggestionList suggestions={suggestionList} setQuery={setQuery}/>
        </div>
    );
}

export default Search;
