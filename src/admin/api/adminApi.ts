import { CLIENT_BACKEND_BASE_PATH } from "../../config/properties";

export const GET_ALL_USERS_ADMIN = "getAllUsersAdmin";

export const getAllUsersSortedConfig = (
  pageNumber: number,
  pageSize: number,
) => {
  return {
    method: "get",
    url: CLIENT_BACKEND_BASE_PATH + "/user/sorted",
    params: { pageNumber, pageSize },
  };
};
