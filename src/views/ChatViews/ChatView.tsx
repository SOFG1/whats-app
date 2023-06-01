import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { chatDialogsSelector, selectedDialogSelector } from "../../store/chat";
import {
  IMessage,
  useGetChatMessagesMutation,
  useGetNotificationsQuery,
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
  const {data: notifications} = useGetNotificationsQuery(
    credentials as UserCredentials,
    { skip: !credentials, pollingInterval: 3000 }
  );
  const [getMessages, { data, ...res }] = useGetChatMessagesMutation({
    fixedCacheKey: chatId || "null",
  });


  const messages = useMemo(() => {
    return (
      data?.messages &&
      [...data.messages].sort((m: IMessage, p) => m.timestamp - p.timestamp)
    );
  }, [data?.messages]);

  useEffect(() => {
    if (credentials && chatId) {
      const { instanceId, instanceToken } = credentials;
      getMessages({ chatId, instanceId, instanceToken });
    }
  }, [credentials, chatId]);

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
