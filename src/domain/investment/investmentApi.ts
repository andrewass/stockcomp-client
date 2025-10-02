import { CLIENT_BACKEND_BASE_PATH } from "../../config/properties";

export const GET_ALL_ACTIVE_INVESTMENTS = "getAllActiveInvestments";
export const GET_INVESTMENT_FOR_SYMBOL = "getInvestmentForSymbol";

export const getAllInvestmentsConfig = () => {
	return {
		method: "get",
		url: CLIENT_BACKEND_BASE_PATH + "/investment/get-all",
	};
};

export const getSymbolInvestmentConfig = (
	symbol: string,
	contestNumber: number,
) => {
	return {
		method: "post",
		url: CLIENT_BACKEND_BASE_PATH + "/investment/get-by-symbol",
		data: { symbol, contestNumber },
	};
};
