import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ disabled?: boolean }>`
  background-color: #00a884;
  color: #fff;
  border: none;
  padding: 5px 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-alowed" : "pointer")};
`;

interface IProps {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = React.memo(({ children, onClick, disabled }: IProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
});

export default Button;
