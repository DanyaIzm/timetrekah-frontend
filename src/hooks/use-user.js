import { useContext, useEffect, useLayoutEffect } from "react";
import AuthContext from "../contexts/auth-context";
import useSWR from "swr";
import { getAuthFetcher } from "../fetcher";
import useSWRImmutable from "swr/immutable";

const useUser = () => {
  const { token } = useContext(AuthContext);

  const { data, error, isLoading, mutate } = useSWR(
    token ? "/auth/users/me" : null,
    getAuthFetcher(token),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return { user: data, error: error, isLoading: isLoading };
};

export default useUser;
