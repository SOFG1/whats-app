import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  display: block;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #00a884;
  outline: none;
`;

interface IProps {
  value: string;
  type?: "email" | "number" | "password" | "text" | "url" | "tel";
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

const TextInput = React.memo(
  ({ value, onChange, placeholder, type = "text", className }: IProps) => {
    return (
      <StyledInput
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    );
  }
);

export default TextInput;
