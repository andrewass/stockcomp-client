import axios from "axios";
import {STOCK_BASE_URL} from "../config/properties";


const URL = {
    symbol_suggestions: STOCK_BASE_URL + "/stock/suggestions",
}


const getSuggestionsFromQuery = async (query: string) => {
    const response = await axios({
        method: "get",
        url: URL.symbol_suggestions,
        params: {query}
    })
    return response.data
}


export {
    getSuggestionsFromQuery
}
