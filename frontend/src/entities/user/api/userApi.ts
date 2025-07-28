import { baseApi } from "@/shared/api/baseApi";
import { UserData } from "@/entities/user/model/userSlice";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),

      // invalidatesTags: ["AllWords", "RepeatWord", "SavedWord", "FavoriteWord"],
    }),
    getDataUser: builder.query<UserData, void>({
      query: () => ({
        url: "/get-user-info",
        method: "GET",
      }),

      // invalidatesTags: ["AllWords", "RepeatWord", "SavedWord", "FavoriteWord"],
    }),
  }),
});

export const { useLogoutUserMutation, useGetDataUserQuery } = userApi;
