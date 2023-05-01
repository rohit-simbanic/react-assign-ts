import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useUserCustomContext } from "../Context/userContext";
import { ActionTypeEnum, IError, IUser } from "../types/Types";
import { useNavigate } from "react-router-dom";
import { Alert, Box } from "@mui/material";
import { useAuthCustomContext } from "../Context/AuthContextAPI";
import { omit } from "lodash";

const EditUser = () => {
  const { id } = useParams();
  const { dispatch, activeUsers } = useUserCustomContext();
  const { activeAuth } = useAuthCustomContext();
  const [showMsg, setShowMessage] = useState<boolean>(false);
  const [errors, setErrors] = useState<IError>({
    username: "",
    email: "",
    phone: "",
  });

  const getEditableUser = activeUsers.find((user) => user.id === id);
  const [editUser, setEditUser] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
  });

  // redirect
  const navigate = useNavigate();

  // function to update user

  const updateTaskAction = () => {
    if (getEditableUser) {
      const data = {
        id: id || "",
        username: editUser?.username || getEditableUser.username,
        email: editUser?.email || getEditableUser.email,
        phone: editUser?.phone || getEditableUser.phone,
      };
      setShowMessage(true);
      dispatch({ type: ActionTypeEnum.Update, data });
    } else {
      setShowMessage(false);
    }
  };

  // validator funciton

  const Validators = (e: any, name: string, value: string) => {
    // find specific username, email, phone to compare
    const usersUsername = activeUsers.map((userName) => userName.username);
    const usersEmail = activeUsers.map((userEmail) => userEmail.email);
    const usersPhone = activeUsers.map((userPhone) => userPhone.phone);
    // console.log(usersUsername);
    switch (name) {
      case "username":
        console.log(value);
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
    setEditUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTaskAction();
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
  // redirect to login page if not logged in
  useEffect(() => {
    if (activeAuth[0].auth === "false") {
      navigate("/login");
    }
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          autoComplete="off"
          required
          placeholder="User Name"
          minLength={5}
          maxLength={10}
          onChange={handleChange}
          defaultValue={getEditableUser?.username}
        />
        {errors?.username && <Alert severity="error">{errors.username}</Alert>}
        <input
          type="email"
          name="email"
          autoComplete="off"
          pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
          required
          placeholder="Email"
          defaultValue={getEditableUser?.email}
          onChange={handleChange}
        />
        {errors?.email && <Alert severity="error">{errors.email}</Alert>}
        <input
          type="tel"
          name="phone"
          autoComplete="off"
          required
          pattern="[7-9]{1}[0-9]{9}"
          placeholder="Mobile Number"
          defaultValue={getEditableUser?.phone}
          onChange={handleChange}
        />
        {errors?.phone && <Alert severity="error">{errors.phone}</Alert>}
        <Button type="submit" variant="contained">
          Edit User
        </Button>
      </form>
      <Box sx={{ width: "50%", margin: "3rem auto" }}>
        {showMsg && (
          <Alert severity="success">Success!! You updated successfully!</Alert>
        )}
      </Box>
    </>
  );
};

export default EditUser;
