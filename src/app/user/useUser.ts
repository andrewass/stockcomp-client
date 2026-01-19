import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiGet } from "../../config/apiWrapper";
import type { User } from "./userTypes";

interface UsersResponse {
	users: User[];
	totalEntriesCount: number;
}

const getUserDetailsConfig = (username: string) => {
	return {
		method: "get",
		url: `/api/proxy/user/details`,
		params: { username },
	};
};
