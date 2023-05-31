import { createSlice } from "@reduxjs/toolkit";
import { IChatState } from ".";
import { chatApi } from "../../api/chat";

const initialState: IChatState = {
  dialogs: ['995579707489', '995599628235'],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      chatApi.endpoints.getChatMessages.matchFulfilled,
      (state, { payload }) => {
        const alreadyAdded = state.dialogs.includes(payload.chatId)
        if(alreadyAdded) {
          alert("You have already added this number")
        }
        if (!alreadyAdded) {
          state.dialogs.push(payload.chatId);
        }
      }
    );
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
