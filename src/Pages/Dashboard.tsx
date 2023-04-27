import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";

const Dashboard = () => {
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
  return (
    <Container maxWidth="lg">
      <Box>
        <h2>User Database:</h2>

        <h2>
          <Link to="/addUser">
            <Button style={{ cursor: "pointer" }}>
              <ModeEditIcon /> Create a user
            </Button>
          </Link>
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table>
            <tbody>
              <tr>
                <Stack spacing={2}>
                  <td>
                    <strong>Username:</strong> <br />
                    <strong>Email:</strong> <br />
                    <strong>Phone: </strong>
                    <br />
                    <br />
                    <button>
                      <DeleteIcon />
                    </button>{" "}
                    <button>
                      <EditIcon />
                    </button>
                  </td>
                </Stack>
              </tr>
            </tbody>
          </table>
        </div>
      </Box>
    </Container>
  );
};

export default Dashboard;
