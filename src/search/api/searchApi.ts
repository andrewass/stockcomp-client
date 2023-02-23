import {STOCK_BASE_URL} from "../../config/properties";

export const getSuggestionsFromQueryConfig = (query: string) => {
    return {
        method: "get",
        url: STOCK_BASE_URL + "/stock/suggestions",
        params: {query}
    }
}
