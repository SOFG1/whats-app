import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { chatDialogsSelector, selectedDialogSelector } from "../../store/chat";
import { IMessage, useGetChatMessagesMutation } from "../../api/chat";
import { userCredentialsSelector } from "../../store/user";
import { MessageComponent } from "../../components/ChatComponents";

const StyledWrapper = styled.div`
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
  const chatId = useSelector(selectedDialogSelector);
  const dialogs = useSelector(chatDialogsSelector);
  const [, { data }] = useGetChatMessagesMutation({
    fixedCacheKey: chatId || "null",
  });

  return (
    <StyledWrapper>
      {!chatId && dialogs.length !== 0 && (
        <StyledText>Please, select a chat</StyledText>
      )}
      {chatId && <StyledText>{chatId}</StyledText>}
      {!dialogs.length && (
        <StyledText>Add a chat to start communicate</StyledText>
      )}

      {chatId && data?.messages?.length === 0 && (
        <StyledText>You have no messages yet</StyledText>
      )}

      {data?.messages?.map((m: IMessage) => (
        <MessageComponent message={m} key={m.idMessage} />
      ))}
    </StyledWrapper>
  );
});

export default ChatView;
