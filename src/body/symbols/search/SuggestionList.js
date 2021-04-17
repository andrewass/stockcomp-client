import React, {useContext} from "react";
import "../symbols.css";
import {NavLink} from "react-router-dom";
import {SymbolContext} from "../../../context/SymbolContext";

const SuggestionList = ({suggestions, setQuery}) => {

    const {setSelectedSymbol} = useContext(SymbolContext);

    return (
        <div id="suggestionList">
            {suggestions.map((suggestion) =>
                <NavLink to="/symbol" key={suggestion.decode} className="link"
                         onClick={() => {
                             setSelectedSymbol(suggestion.symbol);
                             setQuery("");
                         }}>
                    {suggestion.symbol} : {suggestion.description}
                </NavLink>)}
        </div>
    )
}

export default SuggestionList;