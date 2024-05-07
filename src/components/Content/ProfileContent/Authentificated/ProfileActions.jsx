import styles from '../../../Styles/ProfileStyles/profileActions.module.css'

export const ProfileActions = () => {
    
    const logout = () => {
        localStorage.removeItem("jwt");
        window.location.reload();
    };

    return (
        <div className={styles.profileActions}>
            <button className={styles.editButton}>
                Edit
            </button>
            <button className={styles.deleteButton}>
                Delete
            </button>
            <button className={styles.exitButton} onClick={logout}>
                Exit
            </button>
        </div>
    );
};