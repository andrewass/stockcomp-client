import {useState} from "react";
import {getRealTimePrice} from "../../../service/symbolService";

const SymbolState = (symbol) => {

    const [isLoading, setIsLoading] = useState(true);
    const [currentPrice, setCurrentPrice] = useState();

    const getCurrentPrice = async () => {
        setIsLoading(true);
        let response = await getRealTimePrice(symbol.symbol);
        setCurrentPrice(response.data);
        setIsLoading(false);
    }

    return{isLoading, getCurrentPrice, currentPrice}
}

export default SymbolState;