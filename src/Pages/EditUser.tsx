import React from "react";
import Button from "@mui/material/Button";

const EditUser = () => {
  return (
    <>
      <form>
        <input
          type="text"
          name="username"
          autoComplete="off"
          required
          placeholder="User Name"
          minLength={5}
          maxLength={10}
        />
        <input
          type="email"
          name="email"
          autoComplete="off"
          pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
          required
          placeholder="Email"
        />
        <input
          type="tel"
          name="phone"
          autoComplete="off"
          required
          pattern="[7-9]{1}[0-9]{9}"
          placeholder="Mobile Number"
        />
        <Button type="submit" variant="contained">
          Edit User
        </Button>
      </form>
    </>
  );
};

export default EditUser;
