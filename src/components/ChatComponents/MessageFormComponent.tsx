import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { SendIcon, TextArea } from "../../UI";
import { useSelector } from "react-redux";
import { userCredentialsSelector } from "../../store/user";
import { selectedDialogSelector } from "../../store/chat";
import { useGetChatMessagesMutation, useSendMessageMutation } from "../../api/chat";

const StyledForm = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;

const StyledTextarea = styled(TextArea)`
  flex-grow: 1;
`;

const StyledBtn = styled.button`
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  transition: 200ms linear;
  &:hover {
    opacity: 0.65;
  }
`;

const MessageFormComponent = React.memo(() => {
  const credentials = useSelector(userCredentialsSelector);
  const chatId = useSelector(selectedDialogSelector);
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const [text, setText] = useState<string>("");

  const handleSend = useCallback(() => {
    if (credentials && chatId) {
      const { instanceId, instanceToken } = credentials;
      sendMessage({ instanceId, instanceToken, chatId, message: text })
        .unwrap()
        .then(() => {
          setText("");
        });
    }
  }, [credentials, chatId, text, sendMessage, getMessages]);

  return (
    <StyledForm>
      <StyledTextarea
        value={text}
        onChange={setText}
        placeholder="Enter message"
      />
      {text && (
        <StyledBtn onClick={handleSend} disabled={isLoading}>
          <SendIcon />
        </StyledBtn>
      )}
    </StyledForm>
  );
});

export default MessageFormComponent;
