import React, { useMemo } from "react";
import styled from "styled-components";
import { IMessage } from "../../api/chat";
import { getFormatedDate } from "../../utils/getFormatedDate";

const StyledBox = styled.div<{ isOutgoing: boolean }>`
  max-width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 10px;
  ${({ isOutgoing }) => isOutgoing && "flex-direction: row-reverse;"}
`;

const StyledMessage = styled.p`
  width: fit-content;
  max-width: 65%;
  padding: 5px;
  border-radius: 10px;
  background-color: #fff;
  font-size: 18px;
  font-family: sans-serif;
  order: -1;
`;

const StyledDate = styled.p`
  font-size: 12px;
  font-family: sans-serif;
  color: #444444;
`;

interface IProps {
  message: IMessage;
}
const MessageComponent = React.memo(({ message }: IProps) => {

  const date = useMemo(() => {
    const date = new Date(message.timestamp * 1000)
    return getFormatedDate(date)
  }, [message.timestamp])

  if (!message.textMessage) return null;
  return (
    <StyledBox isOutgoing={message.type === "outgoing"}>
      <StyledDate>{date}</StyledDate>
      <StyledMessage>{message.textMessage}</StyledMessage>
    </StyledBox>
  );
});

export default MessageComponent;
