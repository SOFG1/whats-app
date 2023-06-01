import React from "react";
import styled from "styled-components";
import { IMessage } from "../../api/chat";

const StyledMessage = styled.p<{isOutgoing: boolean}>`
  width: fit-content;
  max-width: 65%;
  padding: 5px;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  font-size: 18px;
  font-family: sans-serif;
  margin-right: 10px;
  ${({isOutgoing}) => isOutgoing && 'margin-left: auto;'}
`;

interface IProps {
  message: IMessage;
}
const MessageComponent = React.memo(({ message }: IProps) => {
  if(!message.textMessage) return null
  return <StyledMessage isOutgoing={message.type === 'outgoing'}>{message.textMessage}</StyledMessage>;
});

export default MessageComponent;
