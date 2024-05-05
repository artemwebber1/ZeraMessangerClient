import styles from '../../Styles/chatsView.module.css';
import { ChatView } from './ChatView';
import { useEffect, useState } from 'react';
import { CreateChatButton } from './CreateChatButton';

export const ChatsView = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const loadChats = () => {
            const fetchOptions = 
            { 
                method: "GET",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIyMDAzIiwiVXNlckVtYWlsIjoiY2hla2hvbmluLmFydGVtQGdtYWlsLmNvbSJ9.6BRn6G--CNJOV_oKoT3YTuRD_vh8j3Lc0zrwFCdlSUQ"
                }
            }
    
            fetch("https://localhost:7185/api/Chats/UserChats", fetchOptions)
                .then(res => res.json())
                .then(data => {
                    setChats(data);
                });
        }

        loadChats();
    });

    return (
        <div className={styles.chatsView}>
            <CreateChatButton />
            {chats.map(chat => <ChatView chatName={chat.chatName} membersCount={chat.membersCount}/>)}
        </div>
    );
};