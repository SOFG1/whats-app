import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChatState } from ".";
import { chatApi } from "../../api/chat";

const initialState: IChatState = {
  dialogs: [],
  selectedDialog: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedDialog: (state, action: PayloadAction<string | null>) => {
      state.selectedDialog = action.payload;
    },
    addDialog: (state, action: PayloadAction<string>) => {
      if (!state.dialogs.includes(action.payload)) {
        state.dialogs.push(action.payload);
      }
      state.selectedDialog = action.payload;
    },
  },
});

export const { setSelectedDialog, addDialog } = userSlice.actions;

export default userSlice.reducer;
