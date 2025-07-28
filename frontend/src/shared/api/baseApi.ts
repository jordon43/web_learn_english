import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "@/entities/user/api/userApi";
import { customFetchBaseQuery } from "@/shared/api/customFetchBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customFetchBaseQuery,
  tagTypes: ["AllWords", "RepeatWord", "SavedWord", "FavoriteWord", "Login"],
  endpoints: () => ({}),
  // catchSchemaFailure: (error, info) => {
  //   console.log("error, info", error, info);
  // },
});
