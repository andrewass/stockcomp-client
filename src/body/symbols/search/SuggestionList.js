import React from "react";
import "../symbols.css";
import {NavLink} from "react-router-dom";

const SuggestionList = ({suggestions}) => {

    return(
        <div id="suggestionList">
            {suggestions.map((suggestion) =>
                <NavLink to="/symbol" className="link">
                    {suggestion.symbol} : {suggestion.description}
                </NavLink>)}
        </div>
    )
}

export default SuggestionList;