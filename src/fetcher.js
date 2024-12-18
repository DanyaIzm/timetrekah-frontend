const BASE_BACKEND_URL = import.meta.env.VITE_BACKEND_HOST;

export const fetcher = async (url) => {
  const res = await fetch(BASE_BACKEND_URL + url, { credentials: "include" });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export const getAuthFetcher = (token) => {
  return async (url) => {
    const res = await fetch(BASE_BACKEND_URL + url, {
      headers: { Authorization: `Token ${token}` },
      credentials: "include",
    });

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };
};

export const mutateFetcher = async (url, { arg }) => {
  const res = await fetch(BASE_BACKEND_URL + url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export const getAuthMutateFetcher = (token) => {
  return async (url, { arg }) => {
    const res = await fetch(BASE_BACKEND_URL + url, {
      method: "POST",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };
};

export const getAuthMutateFetcherRaw = (token) => {
  return async (url, { arg }) => {
    const res = await fetch(BASE_BACKEND_URL + url, {
      method: "POST",
      body: arg,
      headers: {
        Authorization: `Token ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };
};
