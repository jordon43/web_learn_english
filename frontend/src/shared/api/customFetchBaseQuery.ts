import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8383/api",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
});

const arrRedirectError = [401];

export const customFetchBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    arrRedirectError.includes(result.error.status) &&
    args.url !== "/logout"
  ) {
    await rawBaseQuery({ url: "/logout", method: "GET" }, api, extraOptions);

    if (typeof window !== "undefined") {
      window.location.replace("/login");
    }

    return { error: result.error };
  }

  return result;
};
