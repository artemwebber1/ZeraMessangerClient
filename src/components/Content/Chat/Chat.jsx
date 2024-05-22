import styles from '../../Styles/ChatStyles/chatStyles.module.css'
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Message } from './Message';
import { InputMessageField } from './InputMessageField';
import { HubConnectionBuilder } from '@microsoft/signalr';


export const Chat = ({user, setMainStyles}) => {
    const [hub, setHub] = useState(null);

    const {chatId} = useParams();

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
        const loadChat = () => {
            const fetchOptions = { method: "GET" };
    
            fetch(`https://localhost:7185/api/Chats/${chatId}`, fetchOptions)
            .then(res => res.json())
            .then(data => {
                setChatName(data.chatName);
                setChatMessages(data.messages);
            });
        };

        const connectToHub = async () => {
            const hub = new HubConnectionBuilder()
                .withUrl("https://localhost:7185/chat")
                .withAutomaticReconnect()
                .build();
    
            hub.on("OnMessageSent", (messageText, authorId) => {
                const message = {
                    authorId: authorId,
                    authorName: user.userName,
                    messageText: messageText
                };
    
                setChatMessages(messages => [...messages, message]);
            });
    
            setHub(hub);
            await hub.start();
            await hub.invoke("AddUserToChat", chatId);
        }

        loadChat();
        if (!isConnectedToChatHub.current) {
            connectToHub();
            isConnectedToChatHub.current = true;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (chatMessages.length > 5){
            setMainStyles({
                backgroundColor: "#A3E998",
                paddingTop: "60px",
                paddingBottom: "10%"
            });

            messagesEndRef?.current.scrollIntoView({ behavior: "smooth" });
        }

        return () => setMainStyles({
            backgroundColor: "#A3E998",
            paddingTop: "60px",
            paddingBottom: "80%"
        });
    }, [chatMessages, setMainStyles]);

    const addMessage = async () => {
        // Не добавляем сообщение в чат если оно пустое
        if (messageText === "")
            return;

        await hub.invoke("AddMessageToChat", messageText.toString(), user.userId.toString(), chatId.toString());
        setMessageText("");
    };

    return (
        <div className={styles.chat}>
            <div className={styles.chatHeader}>
                <div className={styles.chatActions}>
                    <button onClick={closeChat}>
                        Back
                    </button>
                    <button>
                        Add member
                    </button>
                </div>
                <p className={styles.chatName}>
                    {chatName}
                </p>
            </div>
            <div className={styles.messagesZone}>
                {chatMessages.map((message, index) => 
                    <div className="message" key={index}>
                        <Message 
                            isMyMessage={message.authorId.toString() === user.userId.toString()}
                            text={message.messageText}
                            authorName={message.authorName} />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <InputMessageField 
                onChange={e => setMessageText(e.target.value)} 
                onSend={addMessage} 
                messageText={messageText} />
        </div>
    );
};
