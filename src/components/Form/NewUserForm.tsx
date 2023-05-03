import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useUserCustomContext } from "../../Context/userContext";
import { ActionTypeEnum, IError, IUser } from "../../types/Types";
import { Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthCustomContext } from "../../Context/AuthContextAPI";
import styled from "@emotion/styled";
import { omit } from "lodash";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: aquamarine;
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

const NewUserForm = () => {
  const [errors, setErrors] = useState<IError>({
    username: "",
    email: "",
    phone: "",
  });

  const { dispatch } = useUserCustomContext();
  const { activeUsers } = useUserCustomContext();
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

  const Validators = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    value: string
  ) => {
    // find specific username, email, phone to compare
    const usersUsername = activeUsers.map((userName) => userName.username);
    const usersEmail = activeUsers.map((userEmail) => userEmail.email);
    const usersPhone = activeUsers.map((userPhone) => userPhone.phone);

    switch (name) {
      case "username":
        if (value.length <= 4) {
          setErrors({
            ...errors,
            username: "Username should be at least 5 characters",
          });
        } else if (value.length > 10) {
          setErrors({
            ...errors,
            username: "Username should not exceed 10 characters",
          });
        } else if (usersUsername.includes(value)) {
          setErrors({
            ...errors,
            username: "Username already exists",
          });
        } else {
          let newObj = omit(errors, "username");
          setErrors(newObj);
        }
        break;
      case "email":
        if (
          !new RegExp(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid Email address",
          });
        } else if (usersEmail.includes(value)) {
          setErrors({
            ...errors,
            email: "Email already exists",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;
      case "phone":
        if (!new RegExp(/[7-9]{1}[0-9]{9}/).test(value)) {
          setErrors({
            ...errors,
            phone: "Enter a valid Phone Number",
          });
        } else if (usersPhone.includes(value)) {
          setErrors({
            ...errors,
            phone: "Phone Number already exists",
          });
        } else {
          let newObj = omit(errors, "phone");
          setErrors(newObj);
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    // validate
    Validators(e, name, value);
    // set user state
    setUsers((prev) => {
      return { ...prev, id: "", [name]: value };
    });
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.username || errors.email || errors.phone) {
      return;
    }
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
          autoComplete="off"
          required
          onChange={handleChange}
          placeholder="User Name"
          value={users.username}
        />
        {errors?.username && <p className="error-text">{errors.username}</p>}
        <Input
          type="email"
          name="email"
          required
          onChange={handleChange}
          autoComplete="off"
          placeholder="Email"
          value={users.email}
        />
        {errors?.email && <p className="error-text">{errors.email}</p>}
        <Input
          type="tel"
          name="phone"
          autoComplete="off"
          required
          onChange={handleChange}
          placeholder="Mobile Number"
          value={users.phone}
        />
        {errors?.phone && <p className="error-text">{errors.phone}</p>}
        <Button type="submit" variant="contained" sx={{ margin: "1rem 0" }}>
          Create User
        </Button>
      </Form>
      <Box sx={{ width: "50%", margin: "3rem auto" }}>
        {showMsg && (
          <Alert severity="success" variant="filled">
            Success!! You have created a new user!
          </Alert>
        )}
      </Box>
    </>
  );
};

export default NewUserForm;
