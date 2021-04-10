import React from "react";

const SuggestionList = ({suggestions}) => {

    return(
        <div id="suggestionList">
            {suggestions.map((suggestion) =>
                <p>{suggestion.symbol} : {suggestion.description}</p>)}
        </div>
    )
}

export default SuggestionList;