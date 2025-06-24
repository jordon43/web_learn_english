import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8383/api" }),
  tagTypes: ["AllWords", "RepeatWord", "SavedWord", "FavoriteWord"],
  endpoints: () => ({}),
});
