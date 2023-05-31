import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from ".";
import { userApi } from "../../api/user";

const initialState: IUserState = {
  credentials: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getInstanceState.matchFulfilled,
      (state, { payload }) => {
        state.credentials = {
          instanceId: payload.instanceId,
          instanceToken: payload.instanceToken,
        };
      }
    );
  },
});

export default userSlice.reducer;
