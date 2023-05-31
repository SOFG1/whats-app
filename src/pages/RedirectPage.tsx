import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userCredentialsSelector } from "../store/user";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const RedirectPage = React.memo(({ children }: IProps) => {
  const navigate = useNavigate();
  const userCredentials = useSelector(userCredentialsSelector);

  useEffect(() => {
    if (!userCredentials) navigate("/sign-in");
    if (userCredentials) navigate("/");

  }, [userCredentials, navigate]);

  return <>{children}</>;
});

export default RedirectPage;
