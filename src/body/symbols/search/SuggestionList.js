import React, {useContext} from "react";
import "../symbols.css";
import {NavLink} from "react-router-dom";
import {SymbolContext} from "../../../context/SymbolContext";

const SuggestionList = ({suggestions, setQuery}) => {

    const {setSelectedSymbol} = useContext(SymbolContext);

    return (
        <ul id="suggestionList">
            {suggestions.map((suggestion) =>
                <li className="suggestion" key={suggestion.symbol}>
                    <NavLink to="/symbol-detail"
                             onClick={() => {
                                 setSelectedSymbol(suggestion);
                                 setQuery("");
                             }}>
                        {suggestion.symbol} : {suggestion.description}
                    </NavLink>
                </li>
            )}
        </ul>
    );
}

export default SuggestionList;
