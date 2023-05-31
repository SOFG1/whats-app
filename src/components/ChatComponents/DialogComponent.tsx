import React from "react";
import styled from "styled-components";

const StyledItem = styled.button`
  border: 2px solid green;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  font-weight: 700;
  font-family: sans-serif;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 2px #0000007d;
  }
`;

interface IProps {
  chatId: string;
}

const DialogComponent = React.memo(({ chatId }: IProps) => {
  return <StyledItem>{chatId}</StyledItem>;
});

export default DialogComponent;
