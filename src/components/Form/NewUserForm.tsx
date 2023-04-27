import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const NewUserForm = () => {
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: tomato;
    width: 50%;
    margin: 3rem auto;
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

  return (
    <Form>
      <Input
        type="text"
        name="username"
        autoComplete="off"
        required
        placeholder="User Name"
        minLength={5}
        maxLength={15}
      />
      <Input
        type="email"
        name="email"
        autoComplete="off"
        pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
        required
        placeholder="Email"
      />
      <Input
        type="tel"
        name="phone"
        autoComplete="off"
        required
        pattern="[7-9]{1}[0-9]{9}"
        placeholder="Mobile Number"
      />
      <Button type="submit" variant="contained">
        Create User
      </Button>
    </Form>
  );
};

export default NewUserForm;
