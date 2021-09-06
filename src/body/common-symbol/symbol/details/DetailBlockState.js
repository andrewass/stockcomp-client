import {useState} from "react";
import {getHistoricPrices} from "../../../../service/symbolService";

const DetailBlockState = (symbol) => {

    const [historicPriceList, setHistoricPriceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const setHistoricPrices = () => {
        getHistoricPrices(symbol.symbol)
            .then(response => {
                setHistoricPriceList(response.data);
                setIsLoading(false);
            })

            .catch(error => console.log(error));
    }

    return {
        setHistoricPrices, historicPriceList, isLoading
    }
}

export default DetailBlockState;
