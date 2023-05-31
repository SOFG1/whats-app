import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistStore } from "redux-persist";
import { emptyApi } from "../api";
import { userReducer } from "./user";
import { chatReducer } from "./chat";




export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,

    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(emptyApi.middleware);
  },
});

export const persistor = persistStore(store);


export type RootStateType = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
