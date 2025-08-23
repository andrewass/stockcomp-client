import { useApiWrapper } from "../../config/useApiWrapper";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { User } from "./userTypes";
import { GET_ALL_USERS, getAllUsersSortedConfig } from "./userApi";

interface UsersResponse {
  users: User[];
  totalEntriesCount: number;
}

export function useGetPageableUsers(pageNumber: number, pageSize: number) {
  const { apiGet } = useApiWrapper();

  return useQuery<UsersResponse>({
    queryKey: [GET_ALL_USERS, pageNumber],
    queryFn: () => apiGet(getAllUsersSortedConfig(pageNumber, pageSize)),
    placeholderData: keepPreviousData,
  });
}
