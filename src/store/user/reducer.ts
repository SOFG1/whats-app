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
  reducers: {
    logout: (state) => {
      state.credentials = null
    },
  },
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

export const { logout } = userSlice.actions;


const persistedUserReducer = persistReducer(
  {
    key: "user",
    storage,
    whitelist: ["credentials"],
  },
  userSlice.reducer
);

export default persistedUserReducer;
