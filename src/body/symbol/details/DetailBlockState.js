import {useContext, useState} from "react";
import {SymbolContext} from "../../../context/SymbolContext";
import {getHistoricPrices, getRealTimePrice} from "../../../service/symbolService";

const DetailBlockState = () => {

    const {selectedSymbol} = useContext(SymbolContext);

    const [priceList, setPriceList] = useState([]);
    const [realTimePrice, setRealTimePrice] = useState(undefined);

    const setHistoricPrices = () => {
        getHistoricPrices(selectedSymbol.symbol)
            .then(response => setPriceList(response.data))
            .catch(error => console.log(error));
    }

    const setCurrentPrice = () => {
        getRealTimePrice(selectedSymbol.symbol)
        .then(response => setRealTimePrice({
            previousClosePrice : response.data.previousClosePrice,
            currentPrice : response.data.currentPrice
        })).catch(error => console.log(error));
    }

    return {
        setHistoricPrices,setCurrentPrice, priceList: priceList, selectedSymbol, realTimePrice
    }
}

export default DetailBlockState;
