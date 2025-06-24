import { baseApi } from "@/shared/api/baseApi";
import { WordData, WordNonFormatData } from "@/entities/word/model/types";

type ParamsAddWord = {
  id: number;
};

export const wordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWords: builder.query<WordNonFormatData[], void>({
      query: () => "/words",
      providesTags: ["AllWords"],
    }),
    getRepeatWords: builder.query<WordNonFormatData[], void>({
      query: () => "/get-all-repeat",
      providesTags: ["RepeatWord"],
    }),
    getSavedWords: builder.query<WordNonFormatData[], void>({
      query: () => "get-all-saved",
      providesTags: ["SavedWord"],
    }),
    getFavoriteWords: builder.query<WordNonFormatData[], void>({
      query: () => "/get-all-favorite",
      providesTags: ["FavoriteWord"],
    }),
    addRepeatWord: builder.mutation<void, ParamsAddWord>({
      query: (data) => ({
        url: "/add-repeat",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["RepeatWord"],
    }),
    addSavedWord: builder.mutation<void, ParamsAddWord>({
      query: (data) => ({
        url: "/add-saved",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["SavedWord"],
    }),
    changeFavoriteWord: builder.mutation<void, ParamsAddWord>({
      query: (data) => ({
        url: "/change-favorite",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["FavoriteWord", "AllWords"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllWordsQuery,
  useGetRepeatWordsQuery,
  useGetSavedWordsQuery,
  useGetFavoriteWordsQuery,
  useAddRepeatWordMutation,
  useAddSavedWordMutation,
  useChangeFavoriteWordMutation,
} = wordApi;
