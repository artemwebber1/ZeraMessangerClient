import { ProfileActions } from "./ProfileActions";
import { UserInfo } from "./UserInfo";
import { NavBar } from "../../NavBar";


export const Profile = ({user}) => {
    const profileStyles = {
        marginLeft: "100px",
        paddingTop: "30px"
    };

    return (
        <>
            <div className="profile" style={profileStyles}>
                <UserInfo userName={user.userName} userEmail={user.userEmail} userId={user.userId}/>
                <ProfileActions />
            </div>
            <NavBar />
        </>
    );
};