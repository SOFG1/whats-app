import React from "react";
import styled from "styled-components";
import { ChatView, DialogsView } from "../views/ChatViews";
import { LogoutIcon } from "../UI";
import { useDispatch } from "react-redux";
import { logout } from "../store/user";

const StyledWrapper = styled.div`
  display: flex;
  background-color: #00a884;
  gap: 10px;
  padding: 15px;
  height: 100vh;
`;

const LogoutBtn = styled.button`
  position: absolute;
  padding: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  top: 5px;
  right: 5px;
`;

const Chat = React.memo(() => {
  const dispatch = useDispatch();

  return (
    <StyledWrapper>
      <LogoutBtn onClick={() => dispatch(logout())}>
        <LogoutIcon />
      </LogoutBtn>
      <DialogsView />
      <ChatView />
    </StyledWrapper>
  );
});

export default Chat;
