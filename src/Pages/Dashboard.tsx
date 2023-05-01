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
import Grid from "@mui/material/Grid";

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

  // paginate and searching & sorting state

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [paginate, setpaginate] = useState(6);

  const data = Object.values(activeUsers);

  const search_parameters = Object.keys(Object.assign({}, ...data));
  const filter_items = [...new Set(data.map((item) => item.username))];

  console.log(data);
  console.log(filter_items);

  function search(items: any) {
    return items.filter(
      (item: any) =>
        item.username.includes(filter) &&
        search_parameters.some((parameter) =>
          item[parameter].toString().toLowerCase().includes(query)
        )
    );
  }

  const load_more = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setpaginate((prevValue) => prevValue + 6);
  };

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
        <Box>
          <Grid
            container
            spacing={10}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 0,
            }}
          >
            <Grid item sx={{ paddingTop: 0, paddingBottom: "4rem" }}>
              <label htmlFor="search-form">
                <input
                  type="search"
                  name="search-form"
                  id="search-form"
                  className="search-input"
                  placeholder="Search for..."
                  onChange={(e) => setQuery(e.target.value)}
                />
                <span className="sr-only">Search By Username</span>
              </label>
            </Grid>
            <Grid item sx={{ paddingTop: 0, paddingBottom: "4rem" }}>
              <div className="select">
                <select
                  onChange={(e) => setFilter(e.target.value)}
                  className="custom-select"
                  aria-label="Filter Countries By Username"
                >
                  <option value="">Filter By Username</option>
                  {filter_items.map((item) => (
                    <option value={item}>Filter By {item}</option>
                  ))}
                </select>
                <span className="focus"></span>
              </div>
            </Grid>
          </Grid>
        </Box>

        <div style={{ overflowX: "auto" }}>
          <table>
            <tbody>
              <tr>
                {search(data)
                  .slice(0, paginate)
                  .map((item: any) => (
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
              {(filter || query) === "" && data.length >= 7 && (
                <button className="load" onClick={load_more}>
                  Load More
                </button>
              )}
            </tbody>
          </table>
        </div>
      </Box>
    </Container>
  );
};

export default Dashboard;
