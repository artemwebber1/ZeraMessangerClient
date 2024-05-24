import { useState } from 'react';
import styles from '../../Styles/ChatStyles/chatStyles.module.css'

export const AddMemberMenu = ({closeFunc, chatId}) => {
    const [memberId, setMemberId] = useState("");

    const addMemberToChat = async () => {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        };

        await fetch(`https://localhost:7185/api/Chats/AddUserToChat?userId=${memberId}&chatId=${chatId}`, fetchOptions);
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
                    onChange={e => setMemberId(e.target.value)} />
            </div>
        </div>
    );
};