import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useUserCustomContext } from "../../Context/userContext";
import { ActionTypeEnum, IUser } from "../../types/Types";
import { Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthCustomContext } from "../../Context/AuthContextAPI";
import styled from "@emotion/styled";

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

const NewUserForm = () => {
  const { dispatch } = useUserCustomContext();
  const [users, setUsers] = useState<IUser>({
    id: "",
    username: "",
    email: "",
    phone: "",
  });
  const [showMsg, setShowMessage] = useState<boolean>(false);
  const { activeAuth } = useAuthCustomContext();

  // redirect
  const navigate = useNavigate();

  // function goes here

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUsers((prev) => {
      return { ...prev, id: "", [name]: value };
    });
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: ActionTypeEnum.Add, users });
    setShowMessage(true);
  };

  // remove alert after 1 second
  useEffect(() => {
    if (showMsg) {
      setTimeout(() => {
        setShowMessage(false);
        navigate("/dashboard");
      }, 2000);
    }
  }, [showMsg]);
  // console.log(users);
  useEffect(() => {
    if (activeAuth[0].auth === "false") {
      navigate("/login");
    }
  });
  return (
    <>
      <Form onSubmit={submitHandler}>
        <Input
          type="text"
          name="username"
          autoComplete="on"
          onChange={handleChange}
          required
          placeholder="User Name"
          minLength={5}
          maxLength={15}
          value={users.username}
        />
        <Input
          type="email"
          name="email"
          onChange={handleChange}
          autoComplete="off"
          pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
          required
          placeholder="Email"
          value={users.email}
        />
        <Input
          type="tel"
          name="phone"
          autoComplete="off"
          onChange={handleChange}
          required
          pattern="[7-9]{1}[0-9]{9}"
          placeholder="Mobile Number"
          value={users.phone}
        />
        <Button type="submit" variant="contained">
          Create User
        </Button>
      </Form>
      <Box sx={{ width: "50%", margin: "3rem auto" }}>
        {showMsg && (
          <Alert severity="success">
            Success!! You have created a new user!
          </Alert>
        )}
      </Box>
    </>
  );
};

export default NewUserForm;
