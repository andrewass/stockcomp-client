import React, {useContext, useEffect} from "react";
import SymbolDetailState from "./SymbolDetailState";
import SearchComponent from "../search/SearchComponent";

const SymbolDetail = () => {

    const {setHistoricPrices, pricelist, selectedSymbol} = SymbolDetailState();

    useEffect(() => {
        setHistoricPrices();
    },[]);

    return(
        <React.Fragment>
            <SearchComponent />
            <p>SymbolDetail {selectedSymbol}</p>
        </React.Fragment>
    )
}

export default SymbolDetail;
