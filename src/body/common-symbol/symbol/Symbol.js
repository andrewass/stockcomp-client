import Header from "../../../header/Header";
import Search from "../search/Search";
import React from "react";
import DetailBlock from "./details/DetailBlock";
import SymbolRightMenu from "./SymbolRightMenu";

const Symbol = () => {

    return (
        <div id="symbolPage">
            <Header/>
            <Search/>
            <div id="symbolBody">
                <DetailBlock />
                <SymbolRightMenu />
            </div>
        </div>
    );
}

export default Symbol;