import styles from '../../Styles/ChatStyles/chatStyles.module.css'


export const InputMessageField = ({onSend, onChange, messageText}) => {
    return (
        <div className={styles.addMessageField}>
            <textarea
                className={styles.messageInput} 
                value={messageText}
                type="text" 
                placeholder="Input message..." 
                onChange={onChange} />
            <button className={styles.sendButton} onClick={onSend}>
                Send
            </button>
        </div>
    );
};