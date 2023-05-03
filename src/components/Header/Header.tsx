import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useAuthCustomContext } from "../../Context/AuthContextAPI";
import { AuthActionTypeEnum, IAuth } from "../../types/Types";

const Head = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: aqua;
  padding: 12px 12px;
  font-size: 18px;
`;
const Logo = styled.div`
  font-size: large;
  font-weight: bold;
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const Header = () => {
  const { dispatch, activeAuth } = useAuthCustomContext();

  function logOut() {
    const data: IAuth = {
      auth: "false",
    };
    dispatch({ type: AuthActionTypeEnum.LOGOUT, data });
  }

  return (
    <Head>
      <Logo>React</Logo>
      <Menu>
        <Link to="/" style={{ textDecoration: "none", marginRight: "10px" }}>
          Home
        </Link>
        {activeAuth[0].auth === "true" && (
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            Dashboard
          </Link>
        )}

        {activeAuth[0].auth === "true" ? (
          <Button variant="contained" onClick={logOut}>
            Logout
          </Button>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="contained">Login</Button>
          </Link>
        )}
      </Menu>
    </Head>
  );
};

export default Header;
