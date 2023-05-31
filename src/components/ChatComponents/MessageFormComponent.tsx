import React, { useState } from "react";
import styled from "styled-components";
import { SendIcon, TextArea } from "../../UI";

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
  const [text, setText] = useState<string>("");

  return (
    <StyledForm>
      <StyledTextarea
        value={text}
        onChange={setText}
        placeholder="Enter message"
      />
      {text && (
        <StyledBtn>
          <SendIcon />
        </StyledBtn>
      )}
    </StyledForm>
  );
});

export default MessageFormComponent;
