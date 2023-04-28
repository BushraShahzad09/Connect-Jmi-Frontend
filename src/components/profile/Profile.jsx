import React from "react";
import { useContext } from "react";
import logo from "../../images/icon.jpg"
import { AuthContext } from "../../context/authContext";
import "./Profile.css"

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    return(
        <div className="profile-container">
            <div className="profile-background">
            </div>
            <div className="white-container">
                <img className="profile-icon" alt="logo" src={logo} width="100px"/>
            </div>
            
            <h1 className="profile-name">{currentUser.name}</h1>
            <p className="bio">Bio</p>
            <div className="profile-post">Posts Number</div>
            <div className="profile-comments">Comments Number</div>
            <a href="/editprofile" className="profile-edit">Edit Profile</a>
        </div>
    )
}

export default Profile;