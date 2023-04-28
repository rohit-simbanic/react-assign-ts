import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useAuthCustomContext } from "../../Context/AuthContextAPI";
import { useNavigate } from "react-router-dom";
import { AuthActionTypeEnum } from "../../types/Types";
import { Alert, Box } from "@mui/material";
type IFormData = {
  username: string;
  password: string;
};

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

const LoginForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
  });

  const [showMsg, setShowMessage] = useState<boolean>(false);

  const { dispatch, activeAuth } = useAuthCustomContext();

  const users = [{ username: "rohit_mondal", password: "123456" }];
  const navigate = useNavigate();

  // functions area

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = users.find((user) => user.username === formData.username);
    // console.log(account);
    if (account && account.password === formData.password) {
      // setAuthenticated(true);
      const data = { auth: "true" };

      dispatch({ type: AuthActionTypeEnum.LOGIN, data });
      setShowMessage(true);
    } else {
      alert("Wrong Credentials");
    }
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
  return (
    <>
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
      <Box sx={{ width: "50%", margin: "3rem auto" }}>
        {showMsg && (
          <Alert severity="success">
            Success!! You have logged in successfully!
          </Alert>
        )}
      </Box>
    </>
  );
};

export default LoginForm;
