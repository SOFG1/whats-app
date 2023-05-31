import { RootStateType } from "../store";

export const chatDialogsSelector = (state: RootStateType) => {
    return state.chat.dialogs
}