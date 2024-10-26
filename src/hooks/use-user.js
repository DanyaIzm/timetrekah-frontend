import { useContext } from "react";
import AuthContext from "../contexts/auth-context";
import useSWR from "swr";
import { getAuthFetcher } from "../fetcher";

const useUser = () => {
  const { token } = useContext(AuthContext);

  const { data, error, isLoading } = useSWR(
    "/auth/users/me",
    getAuthFetcher(token),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return { user: data, error: error, isLoading: isLoading };
};

export default useUser;
