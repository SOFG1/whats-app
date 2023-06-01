import React, { useMemo } from "react";
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
  border-radius: 15px;
  border: 3px solid #fff;
  flex-grow: 1;
  padding: 15px;
  margin-inline-end: 20px;
`;

const StyledBox = styled.div`
  overflow-y: auto;
  margin-bottom: 10px;
  /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #fff;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
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
      <StyledBox>
        {messages?.map((m: IMessage) => (
          <MessageComponent message={m} key={m.idMessage} />
        ))}
      </StyledBox>
      {chatId && <MessageFormComponent />}
    </StyledWrapper>
  );
});

export default ChatView;
