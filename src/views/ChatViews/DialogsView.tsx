import React from "react";
import styled from "styled-components";
import { CreateChatComponent } from "../../components/ChatComponents";

const StyledWrapper = styled.div`
  height: 100%;
  width: 300px;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
`;

const StyledTitle = styled.p`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const DialogsView = React.memo(() => {
  return (
    <StyledWrapper>
      <StyledTitle>Chats:</StyledTitle>
      <CreateChatComponent />
    </StyledWrapper>
  );
});

export default DialogsView;
