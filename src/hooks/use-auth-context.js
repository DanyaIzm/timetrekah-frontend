import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { getAuthMutateFetcher } from "../fetcher";
import { mutate, useSWRConfig } from "swr";

const useAuthContext = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const { trigger } = useSWRMutation(
    "/auth/token/logout",
    getAuthMutateFetcher(token)
  );

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    mutate("/auth/users/me", null);
    trigger();
  };

  return { token, login, logout };
};

export default useAuthContext;
