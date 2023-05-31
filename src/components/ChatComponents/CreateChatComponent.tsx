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
  margin-bottom: 10px;
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
  const credentials = useSelector(userCredentialsSelector);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [getMessages, { isLoading }] = useGetChatMessagesMutation({
    fixedCacheKey: phoneNumber,
  });

  const handleChangeNumber = useCallback((phone: string) => {
    if (!phoneNumberValidator(phone) && phone !== "") {
      return;
    }
    setPhoneNumber(phone);
  }, []);

  const handleCreateChat = useCallback(() => {
    const { instanceId, instanceToken } = credentials as UserCredentials;
    getMessages({ chatId: phoneNumber, instanceId, instanceToken })
      .unwrap()
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setPhoneNumber("");
      });
  }, [credentials, phoneNumber]);

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
