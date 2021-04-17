import {useContext, useState} from "react";
import {SymbolContext} from "../../../context/SymbolContext";
import symbolService from "../../../service/symbolService";

const SymbolDetailState = () => {

    const {selectedSymbol} = useContext(SymbolContext);

    const [pricelist, setPricelist] = useState([]);

    const setHistoricPrices = () => {
        symbolService.getHistoricPrices(selectedSymbol)
            .then(response => setPricelist(response.data))
            .catch(error => console.log(error));
    }

    return {
        setHistoricPrices, pricelist, selectedSymbol
    }
}

export default SymbolDetailState;
