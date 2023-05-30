import React from "react";
import styled from "styled-components";
import { WhatsAppIcon } from "../UI";
import { SignInView } from "../views/SignInViews";

const StyledPage = styled.div`
  min-height: 100vh;
  background-color: #00a884;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const SignIn = React.memo(() => {
  return (
    <StyledPage>
      <WhatsAppIcon />
      <SignInView />
    </StyledPage>
  );
});

export default SignIn;
