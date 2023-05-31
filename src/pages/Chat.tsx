import React from "react";
import styled from "styled-components";
import { DialogsView } from "../views/ChatViews";

const StyledWrapper = styled.div`
  display: flex;
  background-color: #00a884;
  gap: 10px;
  padding: 15px;
  height: 100vh;
`;

const Chat = React.memo(() => {
  return (
    <StyledWrapper>
      <DialogsView />
    </StyledWrapper>
  );
});

export default Chat;
