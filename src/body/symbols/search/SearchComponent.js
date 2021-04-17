import React, {useEffect} from "react";
import "../symbols.css";
import SuggestionList from "./SuggestionList";
import SearchComponentState from "./SearchComponentState";
import searchIcon from "../../../icons/loupe.svg";

const SearchComponent = () => {

    const {
        setQuery, query, updateQuery, suggestionList, getSuggestions
    } = SearchComponentState();

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

export default SearchComponent;
