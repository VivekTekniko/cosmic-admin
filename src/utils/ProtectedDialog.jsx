import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserLogin from "../DialogeBox/UserLogin";
const ProtectedDialog = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return <>{/* <UserLogin open={Loginpopup} close={() => logindialogbox()} /> */}</>;
};

export default ProtectedDialog;
