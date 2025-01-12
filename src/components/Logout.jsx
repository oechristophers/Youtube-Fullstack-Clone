import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import styled from "styled-components";

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid red;
  color: red;
  text-align: center;
  justify-content: center;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default Logout;
