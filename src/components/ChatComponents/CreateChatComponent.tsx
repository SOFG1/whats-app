import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Button, TextInput } from "../../UI";
import { phoneNumberValidator } from "../../utils/phoneNumberValidator";

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
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleChangeNumber = useCallback((phone: string) => {
    if (!phoneNumberValidator(phone) && phone !== "") {
      return;
    }
    setPhoneNumber(phone);
  }, []);

  return (
    <StyledBox>
      +
      <StyledInput
        type="tel"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={handleChangeNumber}
      />
      <StyledButton disabled={phoneNumber.length !== 12}>Add chat</StyledButton>
    </StyledBox>
  );
});

export default CreateChatComponent;
