import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChatState } from ".";
import { chatApi } from "../../api/chat";

const initialState: IChatState = {
  dialogs: [],
  selectedDialog: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedDialog: (state, action: PayloadAction<string | null>) => {
      state.selectedDialog = action.payload
    },
  },
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



export const {setSelectedDialog} = userSlice.actions;

export default userSlice.reducer;
