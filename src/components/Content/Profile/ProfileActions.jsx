import styles from '../../Styles/profileActions.module.css'

export const ProfileActions = () => {
    return (
        <div className={styles.profileActions}>
            <button className={styles.editButton}>
                Edit
            </button>
            <button className={styles.deleteButton}>
                Delete
            </button>
        </div>
    );
};