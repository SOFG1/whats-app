import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Button, TextInput } from "../../UI";
import { phoneNumberValidator } from "../../utils/phoneNumberValidator";
import { useSelector } from "react-redux";
import { UserCredentials, userCredentialsSelector } from "../../store/user";
import { useGetChatMessagesMutation } from "../../api/chat";

const StyledBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled(TextInput)`
  max-width: 95px;
`;

const StyledButton = styled(Button)`
  font-size: 14px;
  white-space: nowrap;
  margin-inline-start: 10px;
`;

const CreateChatComponent = React.memo(() => {
  const [getMessages, { isLoading }] = useGetChatMessagesMutation();
  const { instanceId, instanceToken } = useSelector(
    userCredentialsSelector
  ) as UserCredentials;
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleChangeNumber = useCallback((phone: string) => {
    if (!phoneNumberValidator(phone) && phone !== "") {
      return;
    }
    setPhoneNumber(phone);
  }, []);

  const handleCreateChat = useCallback(() => {
    getMessages({ chatId: phoneNumber, instanceId, instanceToken })
      .unwrap()
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setPhoneNumber('')
      })
  }, [instanceId, instanceToken, phoneNumber]);

  return (
    <StyledBox>
      +
      <StyledInput
        type="tel"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={handleChangeNumber}
      />
      <StyledButton
        onClick={handleCreateChat}
        disabled={phoneNumber.length !== 12 || isLoading}
      >
        Add chat
      </StyledButton>
    </StyledBox>
  );
});

export default CreateChatComponent;
