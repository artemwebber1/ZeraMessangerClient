import styles from '../../Styles/ChatStyles/chatStyles.module.css'


export const Message = (props) => {
    return (
        <div className={props.isMyMessage ? styles.myMessage : styles.message}>
            <p className={styles.messageText}>
                {props.text}
            </p>
            <p className={styles.messagesAuthorName}>
                {props.authorName}
            </p>
        </div>
    );
};