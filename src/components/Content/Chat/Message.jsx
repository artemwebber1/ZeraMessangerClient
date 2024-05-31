import styles from '../../Styles/ChatStyles/chatStyles.module.css'


export const Message = ({text, authorName, isMyMessage}) => {
    return (
        <div className={isMyMessage ? styles.myMessage : styles.message}>
            <p className={styles.messageText}>
                {text}
            </p>
            <p className={styles.messagesAuthorName}>
                {authorName}
            </p>
        </div>
    );
};