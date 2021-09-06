import {useState} from "react";
import {getRealTimePrice} from "../../../service/symbolService";

const SymbolState = (symbol) => {

    const [isLoading, setIsLoading] = useState(true);
    const [currentPrice, setCurrentPrice] = useState();

    const getCurrentPrice = () => {
        getRealTimePrice(symbol.symbol)
            .then(response => {
                setCurrentPrice(response.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    return{isLoading, getCurrentPrice, currentPrice}
}

export default SymbolState;