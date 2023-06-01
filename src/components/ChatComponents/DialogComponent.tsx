import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setSelectedDialog } from "../../store/chat";

const StyledItem = styled.button<{selected: boolean}>`
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
  ${({selected}) => selected && 'background-color: green; color: #fff;'}
`;

interface IProps {
  chatId: string;
  selected:boolean
}

const DialogComponent = React.memo(({ chatId, selected }: IProps) => {
  const dispatch = useDispatch();

  return (
    <StyledItem onClick={() => dispatch(setSelectedDialog(chatId))} selected={selected}>
      {chatId}
    </StyledItem>
  );
});

export default DialogComponent;
