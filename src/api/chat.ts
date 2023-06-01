import { emptyApi } from ".";
import { IUserLoginPayload } from "./user";

const outgoingMessagesTypes = [
  "outgoingAPIMessageReceived",
  "outgoingMessageReceived",
];

interface IChatHistoryPayload extends IUserLoginPayload {
  chatId: string;
}

interface ISendMessagePayload extends IChatHistoryPayload {
  message: string;
}

interface IDeleteNotificationPayload extends IUserLoginPayload {
  receiptId: number;
}

export interface IMessage {
  chatId: string;
  idMessage: string;
  sendByApi: boolean;
  statusMessage: string;
  textMessage: string;
  timestamp: number;
  type: string;
  typeMessage: string;
}

type ChatHistoryRes = {
  chatId: string;
  messages: IMessage[];
};

export const chatApi = emptyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => {
    return {
      getChatMessages: builder.query<any, IChatHistoryPayload>({
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
        transformResponse: (raw: any): ChatHistoryRes => {
          return raw;
        },
        transformErrorResponse: (raw: any) => {
          return raw;
        },
      }),
      getNotification: builder.query<any, IUserLoginPayload>({
        query: ({ instanceId, instanceToken }) => {
          return {
            url: `waInstance${instanceId}/receiveNotification/${instanceToken}/`,
            method: "GET",
          };
        },
        async onQueryStarted(payload, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            //Outgoing message handling
            if (outgoingMessagesTypes.includes(data?.body?.typeWebhook)) {
              const chatId = data.body.senderData.chatId.slice(0, 12);
              const outgoingMessage =
                data.body?.messageData?.extendedTextMessageData?.text;
              const apiMessageText =
                data.body?.messageData?.textMessageData?.textMessage;
              const newMessage = {
                type: "outgoing",
                idMessage: data.body.idMessage,
                typeMessage: "extendedTextMessage",
                chatId,
                textMessage: outgoingMessage || apiMessageText,
                timestamp: data.body.timestamp,
              };
              dispatch(
                chatApi.util.updateQueryData(
                  "getChatMessages",
                  { ...payload, chatId },
                  (draft) => {
                    draft.messages.push(newMessage);
                  }
                )
              );
            }
            //Incoming message handling
            if (data?.body?.typeWebhook === "incomingMessageReceived") {
              const chatId = data.body.senderData.chatId.slice(0, 12);
              const textMessage =
                data.body.messageData.textMessageData.textMessage;
              const newMessage = {
                type: "incoming",
                idMessage: data.body.idMessage,
                typeMessage: "extendedTextMessage",
                chatId,
                textMessage,
                timestamp: data.body.timestamp,
              };
              dispatch(
                chatApi.util.updateQueryData(
                  "getChatMessages",
                  { ...payload, chatId },
                  (draft) => {
                    draft.messages.push(newMessage);
                  }
                )
              );
            }
            //Delete notification
            if (data?.receiptId) {
              const receiptId = data.receiptId;
              dispatch(
                chatApi.endpoints.deleteNotification.initiate({
                  ...payload,
                  receiptId,
                })
              );
            }
          } catch {}
        },
        transformResponse: (raw: any) => {
          return raw;
        },
      }),
      deleteNotification: builder.mutation<any, IDeleteNotificationPayload>({
        query: ({ instanceId, instanceToken, receiptId }) => {
          return {
            url: `waInstance${instanceId}/deleteNotification/${instanceToken}/${receiptId}/
            `,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useGetChatMessagesQuery,
  useSendMessageMutation,
  useGetNotificationQuery,
} = chatApi;
