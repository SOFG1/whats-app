import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { chatDialogsSelector, selectedDialogSelector } from "../../store/chat";
import {
  IMessage,
  useGetChatMessagesQuery,
  useGetNotificationQuery,
} from "../../api/chat";
import { UserCredentials, userCredentialsSelector } from "../../store/user";
import {
  MessageComponent,
  MessageFormComponent,
} from "../../components/ChatComponents";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  border-radius: 15px;
  border: 3px solid #fff;
  flex-grow: 1;
  padding: 15px;
  margin-inline-end: 20px;
`;

const StyledText = styled.p`
  text-align: center;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  font-family: sans-serif;
  margin-bottom: 10px;
`;

const ChatView = React.memo(() => {
  const credentials = useSelector(userCredentialsSelector);
  const chatId = useSelector(selectedDialogSelector);
  const dialogs = useSelector(chatDialogsSelector);
  const { data: notifications } = useGetNotificationQuery(
    credentials as UserCredentials,
    { skip: !credentials, pollingInterval: 2000 }
  );
  const { data } = useGetChatMessagesQuery(
    { ...(credentials as UserCredentials), chatId: chatId as string },
    { skip: !credentials || !chatId }
  );

  const messages = useMemo(() => {
    return (
      data?.messages &&
      [...data.messages].sort((m: IMessage, p) => m.timestamp - p.timestamp)
    );
  }, [data?.messages]);

  return (
    <StyledWrapper>
      {!chatId && dialogs.length !== 0 && (
        <StyledText>Please, select a chat</StyledText>
      )}
      {chatId && <StyledText>{chatId}</StyledText>}
      {!dialogs.length && (
        <StyledText>Add a chat to start communicate</StyledText>
      )}

      {chatId && messages?.length === 0 && (
        <StyledText>You have no messages yet</StyledText>
      )}

      {messages?.map((m: IMessage) => (
        <MessageComponent message={m} key={m.idMessage} />
      ))}
      {chatId && <MessageFormComponent />}
    </StyledWrapper>
  );
});

export default ChatView;
