import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
const LoginForm = () => {
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: tomato;
    width: 50%;
    margin: auto;
    padding: 70px 0;
    position: relative;
  `;
  const Input = styled.input`
    padding: 5px;
    border: 1px solid gray;
    margin: 7px;
    width: 67%;
    height: 26px;
  `;

  // functions area

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    const value = e.target.value;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="username"
        autoComplete="off"
        required
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        autoComplete="off"
        required
        onChange={handleChange}
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
