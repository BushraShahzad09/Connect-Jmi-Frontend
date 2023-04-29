import React from "react";
import { useContext, useEffect,useState } from "react";
import logo from "../../images/icon.jpg"
import { AuthContext } from "../../context/authContext";
import "./Profile.css"
import { makeRequest } from "../../axios";
import moment from 'moment'
import {useMutation,  useQueryClient, useQuery} from 'react-query'

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    let userid = currentUser.id;

    const {isLoading, error, data}=useQuery(['profile-post'], ()=>
    makeRequest.get("/users/postno/"+userid).then((res)=>{
        return res.data
    })
    )
    
    return(
        <div className="profile-container">
            <div className="profile-background">
            </div>
            <div className="white-container">
                <img className="profile-icon" alt="logo" src={logo} width="100px"/>
            </div>
            
            <h1 className="profile-name">{currentUser.name}</h1>

            <p className="bio">Bio:  {error ? "Something went wrong!" : (isLoading? "loading" : data[0].bio )}</p>

            <div className="profile-post">Total No of Posts: {error ? "Something went wrong!" : (isLoading? "loading" : data[0].pno )}
            </div>
            <div className="profile-comments">Total No of Comments: {error ? "Something went wrong!" : (isLoading? "loading" : data[0].cno )}</div>
            <a href="/editprofile" className="profile-edit">Edit Profile</a>
        </div>
    )
}

export default Profile;