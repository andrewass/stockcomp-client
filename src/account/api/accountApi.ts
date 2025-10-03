import { CLIENT_BACKEND_BASE_PATH } from "../../config/properties";
import type { UpdateAccountInput } from "../AccountDetailsForm";

export const GET_ACCOUNT_DETAILS = "getAccountDetails";

export const getAccountDetailsConfig = () => {
	return {
		method: "get",
		url: `${CLIENT_BACKEND_BASE_PATH}/user/details`,
	};
};

export const updateAccountDataConfig = (accountData: UpdateAccountInput) => {
	return {
		method: "patch",
		url: `${CLIENT_BACKEND_BASE_PATH}/user/update`,
		data: accountData,
	};
};
