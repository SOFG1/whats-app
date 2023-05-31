import { RootStateType } from "../store";

export const chatDialogsSelector = (state: RootStateType): string[] => {
  return state.chat.dialogs;
};

export const selectedDialogSelector = (state: RootStateType): string | null => {
  return state.chat.selectedDialog;
};
