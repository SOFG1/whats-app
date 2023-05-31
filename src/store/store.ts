import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userReducer } from "./user";
import { emptyApi } from "../api";


export const store = configureStore({
  reducer: {
    user: userReducer,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(emptyApi.middleware);
  },
});


export type RootStateType = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
