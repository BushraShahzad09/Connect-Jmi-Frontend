import React from "react";
//import blob from "../images/blob.svg";
import "./Header.css";
import { Navigate } from "react-router-dom";
import { Link, useNavigate} from 'react-router-dom'
import logo from "../images/logo.png"

const Header = () => {
  const navigate=useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem("user")
    navigate("/login");
  }

  return (
  <>
  <div className="redbox">
  <img src={logo} width="200px"/>
  <button className="logout" onClick={handleLogout}>Logout</button>
  </div>;
  </>
  )
};

export default Header;
