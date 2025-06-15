import { useApiWrapper } from "./useApiWrapper";
import { useQuery } from "@tanstack/react-query";
import { GET_VALID_SESSION, getValidSessionConfig } from "../auth/api/authApi";
import { ValidSession } from "../auth/authTypes";
import { CircularProgress } from "@mui/material";
import ErrorComponent from "../error/ErrorComponent";
import { CLIENT_BACKEND_BASE_URL } from "./properties";
import { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element[] }) => {
  const { apiGet } = useApiWrapper();

  const redirectToApi = () => {
    window.location.href = CLIENT_BACKEND_BASE_URL + "/auth/login";
  };

  const { isPending, isError, data, error } = useQuery<ValidSession>({
    queryKey: [GET_VALID_SESSION],
    queryFn: () => apiGet(getValidSessionConfig()),
  });

  if (isPending) return <CircularProgress />;

  if (isError) return <ErrorComponent error={error} />;

  if (data.validSession) {
    return <>{children}</>;
  } else {
    return <button onClick={() => redirectToApi()}>Log In</button>;
  }
};
