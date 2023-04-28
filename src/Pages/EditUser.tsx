import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useUserCustomContext } from "../Context/userContext";
import { ActionTypeEnum, IUser } from "../types/Types";
import { useNavigate } from "react-router-dom";
import { Alert, Box } from "@mui/material";

const EditUser = () => {
  const { id } = useParams();
  const { dispatch, activeUsers } = useUserCustomContext();
  const [showMsg, setShowMessage] = useState<boolean>(false);

  const getEditableUser = activeUsers.find((user) => user.id === id);
  const [editUser, setEditUser] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
  });
  console.log(editUser);
  console.log(getEditableUser);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
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
