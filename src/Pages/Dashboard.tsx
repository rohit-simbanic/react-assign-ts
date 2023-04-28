import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { useUserCustomContext } from "../Context/userContext";
import { ActionTypeEnum } from "../types/Types";
import { useNavigate } from "react-router-dom";
import { useAuthCustomContext } from "../Context/AuthContextAPI";

const Button = styled.button`
  padding: 9px 22px;
  border-radius: 0;
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: black;
  background: aqua;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const ButtonItem = styled.button`
  padding: 4px 8px;
  border-radius: 0;
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background: tomato;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  &:hover : {
    backgroundcolor: aqua;
  }
`;
const Dashboard = () => {
  const { dispatch, activeUsers } = useUserCustomContext();
  const { activeAuth } = useAuthCustomContext();

  // delete function
  const onTaskDelete = (id: string) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch({ type: ActionTypeEnum.Delete, users: { id } });
    }
  };
  // redirect function and setUserId state
  const navigate = useNavigate();

  const editFunc = (id: string) => {
    navigate(`/edit/${id}`);
  };

  // redirect to login page if not logged in
  useEffect(() => {
    if (activeAuth[0].auth === "false") {
      navigate("/login");
    }
  });

  return (
    <Container maxWidth="lg">
      <Box>
        <h2>User Database:</h2>

        <h2>
          <Link to="/addUser" style={{ textDecoration: "none" }}>
            <Button style={{ cursor: "pointer" }}>
              <ModeEditIcon /> Create a user
            </Button>
          </Link>
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table>
            <tbody>
              <tr>
                {activeUsers.map((item) => (
                  <td key={item.id}>
                    <Stack>
                      <strong>Username:</strong>
                      {item.username} <br />
                      <strong>Email:</strong> {item.email}
                      <br />
                      <strong>Phone:{item.phone} </strong>
                      <br />
                      <br />
                      <Stack spacing={2} direction="row">
                        <ButtonItem>
                          <DeleteIcon onClick={() => onTaskDelete(item.id)} />
                        </ButtonItem>{" "}
                        <ButtonItem>
                          <EditIcon onClick={() => editFunc(item.id)} />
                        </ButtonItem>
                      </Stack>
                    </Stack>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Box>
    </Container>
  );
};

export default Dashboard;
