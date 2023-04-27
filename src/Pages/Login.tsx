import React from "react";
import styled from "@emotion/styled";
import LoginForm from "../components/Form/LoginForm";

const Login = () => {
  const LoginContainer = styled.div`
    text-align: center;
    margin: 7rem 0;
  `;
  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
};

export default Login;
