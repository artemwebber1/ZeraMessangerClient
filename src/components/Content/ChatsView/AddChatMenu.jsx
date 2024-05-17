import { useState } from 'react';
import styles from '../../Styles/ChatsViewStyles/AddChatMenu.module.css'

export const AddChatMenu = ({closeMenu, onConfirmed}) => {
    const [createErrorText, setCreateErrorText] = useState("");
    const [enteredChatName, setEnteredChatName] = useState("");

    const createChat = () => {
        const fetchOptions = 
        { 
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "text/plain"
            },
        }

        fetch(`https://localhost:7185/api/chats/CreateChat?chatName=${enteredChatName}`, fetchOptions)
            .then(res => res.json())
            .then(chatId => {
                if (enteredChatName === "" || enteredChatName === null)
                {
                    setCreateErrorText("Chat name can't be empty.");
                    return;
                }
                onConfirmed(enteredChatName, chatId);
                closeMenu();
            });
    }

    return (
        <div className={styles.menuWrapper}>
            <p className={styles.errorMessage}>{createErrorText}</p>
            <input 
                type="text"
                placeholder="Input name" 
                className={styles.nameInput}
                onChange={(e) => {
                    setEnteredChatName(e.target.value);
                    setCreateErrorText("");
                }} 
            />
            <div className={styles.menuActions}>
                <button className={styles.confirmBtn} onClick={createChat}>
                    Confirm
                </button>
                <button className={styles.cancelBtn} onClick={closeMenu}>
                    Cancel
                </button>
            </div>
        </div>
    );
};