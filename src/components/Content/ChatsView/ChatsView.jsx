import styles from '../../Styles/chatsView.module.css';
import { NavBar } from '../../NavBar';
import { ChatView } from './ChatView';
import { useEffect, useState } from 'react';
import { CreateChatButton } from './CreateChatButton';
import { NavLink } from 'react-router-dom';
import { AddChatMenu } from './AddChatMenu';

export const ChatsView = () => {
    const [chats, setChats] = useState([]);

    const [showAddChatMenu, setShowAddChatMenu] = useState(false);

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

    const showChatAddMenu = () => {
        setShowAddChatMenu(true);
    };

    const createChat = (chatName, chatId) => {
        const newChat = {
            chatId: chatId,
            chatName: chatName,
            membersCount: 1
        };

        setChats(chats => [...chats, newChat]);
    };

    return (
        <>
            <div className={styles.chatsView}>
                <CreateChatButton onClick={showChatAddMenu} />
                {showAddChatMenu 
                ? <AddChatMenu
                    closeMenu={() => setShowAddChatMenu(false)}
                    onConfirmed={createChat} /> : null}

                {chats.map((chat, index) => {
                    const chatPath = "/chats/" + chat.chatId;
                    return (
                        <NavLink to={chatPath} key={index}>
                            <ChatView chatName={chat.chatName} membersCount={chat.membersCount} />
                        </NavLink>
                    )
                })}
            </div>
            <NavBar />
        </>
    );
};