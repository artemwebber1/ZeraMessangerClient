import { useState } from 'react';
import styles from '../../Styles/ChatStyles/chatStyles.module.css'

export const AddMemberMenu = ({closeFunc, chatId, chatHub}) => {
    const [userToAddId, setUserToAddId] = useState("");

    const addMemberToChat = async () => {
        await chatHub?.invoke("AddUserToChat", parseInt(userToAddId), parseInt(chatId));
        closeFunc();
    };

    return(
        <div className={styles.addMemberMenuWrapper}>
            <div className={styles.addMemberMenuActions}>
                <button onClick={addMemberToChat} className={styles.confirmAddMemberMenuButton}>Confirm</button>
                <button onClick={closeFunc} className={styles.closeAddMemberMenuButton}>Close</button>
            </div>
            <div className={styles.addMemberMenuContent}>
                <label htmlFor="memberIdInput">Input member ID: </label>
                <input 
                    id='memberIdInput' 
                    type="text" 
                    className={styles.memberIdInput}
                    onChange={e => setUserToAddId(e.target.value)} />
            </div>
        </div>
    );
};