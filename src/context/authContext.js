import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(
  //   JSON.parse(localStorage.getItem("user")) || null
  // );
  const [currentUser, setCurrentUser] = useState({
    name:"Arsa",
    profilePic:"abc"
  });

  const login = async (inputs) => {
    const res=await axios.post("http://localhost:8800/api/auth/login", inputs, {
      withCredentials: true,
    })
    setCurrentUser(res.data)
  };

  const register = async (inputs) => {
    const res=await axios.post("http://localhost:8800/api/auth/register", inputs, {
      withCredentials: true,
    })
    setCurrentUser(res.data);
    // console.log(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login , register}}>
      {children}
    </AuthContext.Provider>
  );
};
