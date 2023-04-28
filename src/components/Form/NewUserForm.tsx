import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useUserCustomContext } from "../../Context/userContext";
import { ActionTypeEnum, IUser } from "../../types/Types";
import { Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthCustomContext } from "../../Context/AuthContextAPI";

const NewUserForm = () => {
  const { dispatch } = useUserCustomContext();
  const [users, setUsers] = useState<IUser[]>([]);
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
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="username"
          autoComplete="on"
          onChange={handleChange}
          required
          placeholder="User Name"
          minLength={5}
          maxLength={15}
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          autoComplete="off"
          pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
          required
          placeholder="Email"
        />
        <input
          type="tel"
          name="phone"
          autoComplete="off"
          onChange={handleChange}
          required
          pattern="[7-9]{1}[0-9]{9}"
          placeholder="Mobile Number"
        />
        <Button type="submit" variant="contained">
          Create User
        </Button>
      </form>
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
