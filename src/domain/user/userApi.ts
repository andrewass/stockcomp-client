import { CLIENT_BACKEND_BASE_PATH } from "../../config/properties";

export const GET_ALL_USERS = "getAllUsers";
export const GET_USER_DETAILS = "getUserDetails";

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

export const getUserDetailsConfig = (username: string) => {
  return {
    method: "get",
    url: CLIENT_BACKEND_BASE_PATH + "/user/details",
    params: { username },
  };
};
