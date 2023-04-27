import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const Header = () => {
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
  return (
    <Head>
      <Logo>React</Logo>
      <Menu>
        <Link to="/" style={{ textDecoration: "none", marginRight: "10px" }}>
          Home
        </Link>

        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          Dashboard
        </Link>

        <Link to="/login" style={{ textDecoration: "none" }}>
          Login
        </Link>

        <Button variant="contained">Logout</Button>
      </Menu>
    </Head>
  );
};

export default Header;
