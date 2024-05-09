import styles from '../../Styles/chatsView.module.css';
import { ChatView } from './ChatView';
import { useEffect, useState } from 'react';
import { CreateChatButton } from './CreateChatButton';

export const ChatsView = () => {
    const [chats, setChats] = useState([]);

    const loadChats = () => {
        const fetchOptions = 
        { 
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }

        fetch("https://localhost:7185/api/Chats/UserChats", fetchOptions)
            .then(res => res.json())
            .then(data => {
                setChats(data);
            });
    }

    useEffect(loadChats, []);

    return (
        <div className={styles.chatsView}>
            <CreateChatButton />
            {chats.map(chat => <ChatView chatName={chat.chatName} membersCount={chat.membersCount}/>)}
        </div>
    );
};