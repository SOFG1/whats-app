import React from "react";
import styled from "styled-components";

const StyledTextrea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  width: 100%;
  resize: none;
  height: 50px;
  font-family: sans-serif;
  font-size: 18px;
`;

interface IProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string
  className?: string;
}

const TextArea = React.memo(({ value, onChange, placeholder, className }: IProps) => {
  return (
    <StyledTextrea
    placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  );
});

export default TextArea;
