import styles from '../../Styles/chatsView.module.css';
import { NavBar } from '../../NavBar';
import { ChatView } from './ChatView';
import { useEffect, useState } from 'react';
import { CreateChatButton } from './CreateChatButton';
import { NavLink } from 'react-router-dom';

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
        <>
            <div className={styles.chatsView}>
                <CreateChatButton />
                {chats.map((chat, index) => {
                    const chatPath = "/chats/" + chat.chatId;
                    return (
                        <NavLink to={chatPath} key={index}>
                            <ChatView chatName={chat.chatName} membersCount={chat.membersCount}/>
                        </NavLink>
                    )
                })}
            </div>
            <NavBar />
        </>
    );
};