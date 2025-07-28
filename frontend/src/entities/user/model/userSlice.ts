import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "@/entities/user/api/userApi";
import { UserData } from "@/entities/user/model/types";

type UserState = {
  userData: UserData;
};

const initState: UserState = {
  userData: {
    name: "",
    id: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    addUser: (state, action) => {
      // console.log("action", action);
      // state.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getDataUser.matchFulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.userData = { ...action.payload };
      },
    );
  },
});

export default userSlice.reducer;

export const { addUser } = userSlice.actions;
