import { emptyApi } from ".";
import { IUserLoginPayload } from "./user";

interface IChatHistoryPayload extends IUserLoginPayload {
  chatId: string;
}

type UserLoginRes = {
  stateInstance: string;
};

export const chatApi = emptyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => {
    return {
      getChatMessages: builder.mutation<any, IChatHistoryPayload>({
        query: ({ instanceId, instanceToken, chatId }) => {
          return {
            url: `waInstance${instanceId}/getChatHistory/${instanceToken}/`,
            method: "POST",
            body: {
              chatId: `${chatId}@c.us`,
            },
          };
        },
        transformResponse: (raw: UserLoginRes, req, params) => {
          return {messages: raw, chatId: params.chatId};
        },
        transformErrorResponse: (raw: any) => {
          return raw.data.message;
        },
      }),
    };
  },
});

export const { useGetChatMessagesMutation } = chatApi;
