import { useEffect, useState } from "react";
import { ProfileActions } from "./ProfileActions";
import { UserInfo } from "./UserInfo";


export const Profile = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");

    const requestProfileData = (authToken) => {
        const fetchOptions = 
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIyMDAzIiwiVXNlckVtYWlsIjoiY2hla2hvbmluLmFydGVtQGdtYWlsLmNvbSJ9.6BRn6G--CNJOV_oKoT3YTuRD_vh8j3Lc0zrwFCdlSUQ"
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

    useEffect(requestProfileData);

    return (
        <div className="profile" style={{marginLeft: "40px"}}>
            <UserInfo userName={userName} userEmail={userEmail} userId={userId}/>
            <ProfileActions />
        </div>
    );
};