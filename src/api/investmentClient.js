import axios from "axios";
import {CONTEST_BASE_URL} from "../config/properties";


const URL = {
    all_investments: CONTEST_BASE_URL + "/investment/get-all",
    symbol_investment: CONTEST_BASE_URL + "/investment/get-by-symbols"
}

const getAllInvestments = async contestNumber => {
    const response = await axios({
        method: "get",
        url: URL.all_investments,
        params: {contestNumber}
    });
    return response.data;
}

const getInvestment = async (symbol, contestNumber) => {
    const response = await axios({
        method: "post",
        url: URL.symbol_investment,
        data: {symbol, contestNumber}
    });
    return response.data;
}

export {getInvestment, getAllInvestments}