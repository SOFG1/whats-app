import React from "react";
import styled from "styled-components";
import {
  CreateChatComponent,
  DialogComponent,
} from "../../components/ChatComponents";
import { useSelector } from "react-redux";
import { chatDialogsSelector, selectedDialogSelector } from "../../store/chat";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 300px;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  overflow-y: auto;
`;

const StyledTitle = styled.p`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const DialogsView = React.memo(() => {
  const dialogs = useSelector(chatDialogsSelector);
  const selected = useSelector(selectedDialogSelector)
  return (
    <StyledWrapper>
      <StyledTitle>Chats:</StyledTitle>
      <CreateChatComponent />
      {dialogs.map((d: string) => {
        return <DialogComponent selected={selected === d} chatId={d} key={d} />;
      })}
    </StyledWrapper>
  );
});

export default DialogsView;
