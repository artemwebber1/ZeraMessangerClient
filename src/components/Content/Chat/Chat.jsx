import styles from '../../Styles/ChatStyles/chatStyles.module.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Message } from './Message';


export const Chat = () => {
    const {id} = useParams();
    const [userId, setUserId] = useState("");

    const [chatName, setChatName] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const loadUserId = () => {
            const fetchOptions = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            };
    
            fetch(`https://localhost:7185/api/users/identity`, fetchOptions)
            .then(res => res.json())
            .then(data => {
                setUserId(data.userId);
            });
        };

        const loadChat = () => {
            const fetchOptions = { method: "GET" };
    
            fetch(`https://localhost:7185/api/Chats/${id}`, fetchOptions)
            .then(res => res.json())
            .then(data => {
                setChatName(data.chatName);
                setChatMessages(data.messages);
            });
        };

        loadUserId();
        loadChat();
    }, [id]);

    return (
        <div className="chat">
            <p className={styles.chatName}>
                Chat: {chatName}
            </p>
            <div className={styles.messagesZone}>
                {chatMessages.map(message => 
                    <Message 
                            isMyMessage={message.authorId === userId}
                            text={message.messageText}
                            authorName={message.authorName} />)}
            </div>
        </div>
    );
};
