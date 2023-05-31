export type UserCredentials = {
    instanceId: string
    instanceToken: string
}

export interface IUserState {
    credentials: UserCredentials | null
}