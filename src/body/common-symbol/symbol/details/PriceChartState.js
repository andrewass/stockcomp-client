import {useState} from "react";
import {getHistoricPrices} from "../../../../service/symbolService";

const PriceChartState = (symbol) => {

    const [historicPriceList, setHistoricPriceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const setHistoricPrices = async () => {
        setIsLoading(true);
        const response = await getHistoricPrices(symbol.symbol);
        setHistoricPriceList(response.data);
        setIsLoading(false);
    }

    return {
        setHistoricPrices, historicPriceList, isLoading
    }
}

export default PriceChartState;