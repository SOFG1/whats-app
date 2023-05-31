import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Button, TextInput } from "../../UI";

const StyledWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 30px;
  background-color: #fff;
  min-width: 300px;
`;

const StyledTitle = styled.h1`
  font-size: 22px;
  text-align: center;
  margin-bottom: 15px;
  font-weight: 700;
  font-family: sans-serif;
`;

const StyledInput = styled(TextInput)`
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
`;

const SignInView = React.memo(() => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <StyledWrapper onSubmit={handleLogin}>
      <StyledTitle>Sign in</StyledTitle>
      <StyledInput
        value={login}
        onChange={setLogin}
        placeholder="Instance ID"
      />
      <StyledInput
        value={password}
        type="password"
        onChange={setPassword}
        placeholder="API Token"
      />
      <StyledButton>Sign in</StyledButton>
    </StyledWrapper>
  );
});

export default SignInView;
