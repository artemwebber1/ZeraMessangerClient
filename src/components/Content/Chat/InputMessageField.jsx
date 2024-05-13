import styles from '../../Styles/ChatStyles/chatStyles.module.css'


export const InputMessageField = (props) => {
    return (
        <div className={styles.addMessageField}>
            <textarea className={styles.messageInput} type="text" placeholder="Input message..." onChange={props.onChange} />
            <button className={styles.sendButton} onClick={props.onSend}>
                Send
            </button>
        </div>
    );
};