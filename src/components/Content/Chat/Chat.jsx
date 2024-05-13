import styles from '../../Styles/ChatStyles/chatStyles.module.css'
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Message } from './Message';
import { InputMessageField } from './InputMessageField';
import { HubConnectionBuilder } from '@microsoft/signalr';


export const Chat = () => {
    const [hub, setHub] = useState(null);

    const {chatId} = useParams();

    const [userId, setUserId] = useState("");

    const [chatName, setChatName] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    const [messageText, setMessageText] = useState("");

    const messagesEndRef = useRef(null);

    const redirect = useNavigate();
    const closeChat = async () => {
        await hub.stop();
        setHub(null);
        redirect("/");
    };

    const isConnectedToChatHub = useRef(false);
    useEffect(() => {
        let userName = "";

        const loadChat = () => {
            const fetchOptions = { method: "GET" };
    
            fetch(`https://localhost:7185/api/Chats/${chatId}`, fetchOptions)
            .then(res => res.json())
            .then(data => {
                setChatName(data.chatName);
                setChatMessages(data.messages);
            });
        };

        const loadUserData = () => {
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
                userName = data.userName;
            });
        };

        const connectToHub = async () => {
            const hub = new HubConnectionBuilder()
                .withUrl("https://localhost:7185/chat")
                .withAutomaticReconnect()
                .build();
    
            hub.on("OnMessageSent", (messageText, authorId, chatId) => {
                const message = {
                    authorId: authorId,
                    authorName: userName,
                    messageText: messageText
                };
    
                setChatMessages(messages => [...messages, message]);
            });
    
            setHub(hub);
            await hub.start();
            await hub.invoke("AddUserToChat", chatId);
        }

        loadUserData();
        if (!isConnectedToChatHub.current)
        {
            connectToHub();
            isConnectedToChatHub.current = true;
        }

        loadChat();
    }, [chatId]);

    useEffect(() => {
        messagesEndRef?.current.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const addMessage = async () => {
        await hub.invoke("AddMessageToChat", messageText.toString(), userId.toString(), chatId.toString());
    };

    return (
        <div className={styles.chat}>
            <div className={styles.chatHeader}>
                <button onClick={closeChat}>
                    Back
                </button>
                <p className={styles.chatName}>
                    {chatName}
                </p>
            </div>
            <div className={styles.messagesZone}>
                {chatMessages.map((message, index) => 
                    <div className="message" key={index}>
                        <Message 
                            isMyMessage={message.authorId.toString() === userId.toString()}
                            text={message.messageText}
                            authorName={message.authorName} />
                    </div>
                )}
                <div ref={messagesEndRef} style={{marginTop: "0px"}}/>
            </div>
            <InputMessageField onChange={e => setMessageText(e.target.value)} onSend={addMessage} />
        </div>
    );
};
