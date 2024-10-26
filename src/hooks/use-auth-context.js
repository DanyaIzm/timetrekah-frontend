import { useEffect, useLayoutEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { getAuthMutateFetcher } from "../fetcher";
import { useNavigate } from "react-router";
import { useSWRConfig } from "swr";

const useAuthContext = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const { trigger } = useSWRMutation(
    "/auth/token/logout",
    getAuthMutateFetcher(token)
  );

  const { mutate } = useSWRConfig();

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    trigger();
    mutate("/auth/users/me", null);
  };

  return { token, login, logout };
};

export default useAuthContext;
