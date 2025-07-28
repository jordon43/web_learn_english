import { configureStore } from "@reduxjs/toolkit";
import wordsSlices from "@/entities/word/model/wordsSlice";
import { baseApi } from "@/shared/api/baseApi";
import userSlice from "@/entities/user/model/userSlice";

export const store = configureStore({
  reducer: {
    wordState: wordsSlices,
    userSlice: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
