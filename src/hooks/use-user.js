import { useContext, useEffect } from "react";
import AuthContext from "../contexts/auth-context";
import useSWR from "swr";
import { getAuthFetcher } from "../fetcher";

const useUser = () => {
  const { token } = useContext(AuthContext);

  const { data, error, isLoading, mutate } = useSWR(
    "/auth/users/me",
    getAuthFetcher(token),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    mutate();
  }, [token]);

  return { user: data, error: error, isLoading: isLoading };
};

export default useUser;
