import styles from '../../Styles/createChatButton.module.css'

export const CreateChatButton = ({onClick}) => {
    return (
        <button className={styles.createChatBtn} onClick={onClick}>
            Create chat
        </button>
    );
};