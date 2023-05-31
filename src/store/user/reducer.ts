import { createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
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

const persistedUserReducer = persistReducer(
  {
    key: "user",
    storage,
    whitelist: ["credentials"],
  },
  userSlice.reducer
);

export default persistedUserReducer;
