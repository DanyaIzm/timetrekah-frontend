const BASE_BACKEND_URL = "http://localhost:8000";

export const fetcher = async (url) => {
  const res = await fetch(BASE_BACKEND_URL + url);

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
