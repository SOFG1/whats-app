import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Button, TextInput } from "../../UI";
import { useLazyGetInstanceStateQuery } from "../../api/user";

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
  const [authorize, {}] = useLazyGetInstanceStateQuery();
  const [instanceId, setInstanceId] = useState<string>("1101826007");
  const [instanceToken, setInstanceToken] = useState<string>("2b5f28fbf4f54ca8bb6bdf0bd2c96f107b2e40fa392f421681");

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      authorize({ instanceId, instanceToken })
        .unwrap()
        .then((r) => {
          if (r.status !== "authorized" && r.status !== "online") {
            alert("There is problem with your instance, please authorized it");
          }
        })
        .catch((e) => {
          alert(`Error occured: ${e.error}`);
        });
    },
    [authorize, instanceId, instanceToken]
  );

  return (
    <StyledWrapper onSubmit={handleLogin}>
      <StyledTitle>Authorization</StyledTitle>
      <StyledInput
        value={instanceId}
        onChange={setInstanceId}
        placeholder="Instance ID"
      />
      <StyledInput
        value={instanceToken}
        onChange={setInstanceToken}
        placeholder="API Token"
      />
      <StyledButton disabled={!instanceId || !instanceToken}>Authorize</StyledButton>
    </StyledWrapper>
  );
});

export default SignInView;
