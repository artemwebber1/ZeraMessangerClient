import styles from '../../Styles/chatView.module.css'

export const ChatView = (props) => {
    return (
        <div className={styles.chatView}>
            <p className={styles.chatName}>
                {props.chatName}
            </p>
            <p className={styles.membersCount}>
                {props.membersCount} members
            </p>
        </div>
    );
};