import { CLIENT_BACKEND_BASE_URL } from "../../config/properties";

export const getSuggestionsFromQueryConfig = (query: string) => {
	return {
		method: "get",
		url: CLIENT_BACKEND_BASE_URL + "/stock/suggestions",
		params: { query },
	};
};
