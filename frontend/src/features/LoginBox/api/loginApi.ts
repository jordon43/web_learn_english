import { baseApi } from "@/shared/api/baseApi";
import { WordData, WordNonFormatData } from "@/entities/word/model/types";

// type ParamsAddWord = {
//   id: number;
// };
//
type DataUserLogin = {
  login: string;
  password: string;
};

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // loginUser: builder.query<void, void>({
    //   query: () => "/login",
    //   providesTags: ["login"],
    // }),
    loginUser: builder.mutation<void, DataUserLogin>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Login"],
    }),
    // addSavedWord: builder.mutation<void, ParamsAddWord>({
    //   query: (data) => ({
    //     url: "/add-saved",
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: data,
    //   }),
    //   invalidatesTags: ["SavedWord"],
    // }),
    // changeFavoriteWord: builder.mutation<void, ParamsAddWord>({
    //   query: (data) => ({
    //     url: "/change-favorite",
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: data,
    //   }),
    //   invalidatesTags: ["FavoriteWord", "AllWords"],
    // }),
  }),
  overrideExisting: false,
});

export const {
  // useGetAllWordsQuery,
  // useGetRepeatWordsQuery,
  // useGetSavedWordsQuery,
  // useGetFavoriteWordsQuery,
  // useAddRepeatWordMutation,
  // useAddSavedWordMutation,
  // useChangeFavoriteWordMutation,
  useLoginUserMutation,
} = loginApi;
