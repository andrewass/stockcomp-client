import {useState} from "react";
import {getHistoricPrices, getRealTimePrice} from "../../../../service/symbolService";

const DetailBlockState = (symbol) => {

    const [priceList, setPriceList] = useState([]);
    const [realTimePrice, setRealTimePrice] = useState(undefined);

    const setHistoricPrices = () => {
        getHistoricPrices(symbol.symbol)
            .then(response => setPriceList(response.data))
            .catch(error => console.log(error));
    }

    const setCurrentPrice = () => {
        getRealTimePrice(symbol.symbol)
            .then(response => setRealTimePrice({
                previousClosePrice: response.data.previousClose,
                currentPrice: response.data.price,
                currency: response.data.currency,
                usdPrice: response.data.usdPrice
            })).catch(error => console.log(error));
    }

    return {
        setHistoricPrices, setCurrentPrice, priceList: priceList, symbol, realTimePrice
    }
}

export default DetailBlockState;
