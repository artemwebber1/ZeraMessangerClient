import styles from "../../../Styles/ProfileStyles/profileUserInfo.module.css"

export const UserInfo = (props) => {
    return (
        <div className="userInfo">
            <p className={styles.userName}>
                {props.userName}
            </p>

            <p className={styles.userEmail}>
                {props.userEmail}
            </p>
            
            <p>
                {props.userId}
            </p>
        </div>
    );
};