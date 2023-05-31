import { UserCredentials } from ".";
import { RootStateType } from "../store";

export const userCredentialsSelector = (state: RootStateType): UserCredentials | null => {
    return state.user.credentials
}