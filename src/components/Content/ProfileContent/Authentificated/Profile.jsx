import { useEffect, useState } from "react";
import { ProfileActions } from "./ProfileActions";
import { UserInfo } from "./UserInfo";


export const Profile = () => {
    const profileStyles = {
        marginLeft: "100px",
        paddingTop: "30px"
    };

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");

    const requestProfileData = () => {
        const fetchOptions = 
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }

        fetch("https://localhost:7185/api/users/identity", fetchOptions)
        .then(res => res.json())
        .then(data => {
            setUserName(data.userName);
            setUserEmail(data.userEmail);
            setUserId(data.userId);
        });
    };

    useEffect(requestProfileData, []);

    return (
        <div className="profile" style={profileStyles}>
            <UserInfo userName={userName} userEmail={userEmail} userId={userId}/>
            <ProfileActions />
        </div>
    );
};