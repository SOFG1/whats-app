import { emptyApi } from ".";
import { IUserLoginPayload } from "./user";

interface IChatHistoryPayload extends IUserLoginPayload {
  chatId: string;
}

interface ISendMessagePayload extends IChatHistoryPayload {
  message: string
}

export interface IMessage {
  chatId: string
  idMessage: string
  sendByApi: boolean;
  statusMessage: string
  textMessage: string
  timestamp: number;
  type: string;
  typeMessage: string;
}


type ChatHistoryRes = {
  chatId: string,
  messages: IMessage[]
}

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
              count: 150,
            },
          };
        },
        transformResponse: (raw: IMessage[], req, params): ChatHistoryRes => {
          return { messages: raw, chatId: params.chatId };
        },
        transformErrorResponse: (raw: any) => {
          return raw.data.message;
        },
      }),
      sendMessage: builder.mutation<any, ISendMessagePayload>({
        query: ({ instanceId, instanceToken, chatId, message }) => {
          return {
            url: `waInstance${instanceId}/sendMessage/${instanceToken}/`,
            method: "POST",
            body: {
              chatId: `${chatId}@c.us`,
              message,
            },
          };
        },
        transformResponse: (raw: any, req, params): ChatHistoryRes => {
          console.log(raw)
          return raw
        },
        transformErrorResponse: (raw: any) => {
          return raw
        },
      }),
    };
  },
});

export const { useGetChatMessagesMutation, useSendMessageMutation } = chatApi;
