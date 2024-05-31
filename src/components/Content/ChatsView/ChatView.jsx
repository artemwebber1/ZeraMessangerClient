import { NavLink } from 'react-router-dom';
import styles from '../../Styles/chatView.module.css'

export const ChatView = ({chatName, membersCount, chatId, exitChat}) => {
    return (
        <div className={styles.chatView}>
            <NavLink to={`/chats/${chatId}`} className={styles.chatInfo}>
                <p className={styles.chatName}>
                    {chatName}
                </p>
                <p className={styles.membersCount}>
                    {membersCount} members
                </p>
            </NavLink>
        </div>
    );
};