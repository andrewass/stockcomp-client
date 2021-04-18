import React from "react";
import Search from "./search/Search";
import TrendingSymbols from "../trending/TrendingSymbols";

const Symbols = () => {

    return (
        <div id="symbolList">
            <Search/>
            <TrendingSymbols />
        </div>
    );
};

export default Symbols;
