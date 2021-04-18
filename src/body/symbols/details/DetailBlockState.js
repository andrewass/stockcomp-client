import {useContext, useState} from "react";
import {SymbolContext} from "../../../context/SymbolContext";
import {getHistoricPrices} from "../../../service/symbolService";

const DetailBlockState = () => {

    const {selectedSymbol} = useContext(SymbolContext);

    const [pricelist, setPricelist] = useState([]);

    const setHistoricPrices = () => {
        console.log("Selected symbol is "+selectedSymbol.symbol);
        getHistoricPrices(selectedSymbol.symbol)
            .then(response => setPricelist(response.data))
            .catch(error => console.log(error));
    }

    return {
        setHistoricPrices, pricelist, selectedSymbol
    }
}

export default DetailBlockState;
