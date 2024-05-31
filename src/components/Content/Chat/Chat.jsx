import styles from '../../Styles/ChatStyles/chatStyles.module.css'
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Message } from './Message';
import { InputMessageField } from './InputMessageField';
import { AddMemberMenu } from './AddMemberMenu';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { EventMessage } from './EventMessage';


export const Chat = () => {
    const {chatId} = useParams();
    const [chatName, setChatName] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [messageText, setMessageText] = useState("");

    const [isShowAddMemberMenu, setShowAddMemberMenu] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const [chatHub, setChatHub] = useState(null);

    const messagesEndRef = useRef(null);

    const redirect = useNavigate();
    const closeChat = async () => {
        await chatHub?.stop();
        setChatHub(null);
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

            const addEventMessage = async (text) => {
                await hub.invoke(
                    "AddMessageToChat", text, parseInt(chatId), null);
            };

            hub.on("OnUserJoinedChat", async (addedUserName) => {
                await addEventMessage(`${user.userName} added new member: ${addedUserName}`);
            });


            hub.on("OnUserLeftChat", async () => {
                await addEventMessage(`${user.userName} left the chat`);
            });


            hub.on("OnMessageSent", (messageText, authorId, authorName) => {
                const message = {
                    messageText: messageText,
                    authorId: authorId,
                    authorName: authorName,
                };
    
                setChatMessages(messages => [...messages, message]);
            });
    
            setChatHub(hub);
            await hub.start();
            await hub.invoke("ConnectUserToChat", chatId);
        }

        loadChat();
        if (!isConnectedToChatHub.current) {
            connectToHub();
            isConnectedToChatHub.current = true;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (chatMessages.length > 5)
            messagesEndRef?.current.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const addMessage = async (messageText, authorId) => {
        // Не добавляем сообщение в чат если оно пустое
        if (messageText === "")
            return;

        await chatHub.invoke(
            "AddMessageToChat", 
            messageText,
            parseInt(chatId),
            parseInt(authorId));

        setMessageText("");
    };

    const toggleAddMemberMenu = () => {
        setShowAddMemberMenu(!isShowAddMemberMenu);
    }

    const exitChat = async () => {
        await chatHub?.invoke("DeleteUserFromChat", parseInt(user.userId), parseInt(chatId));
        await closeChat();
    }

    return (
        <div className={styles.chat}>
            <div className={styles.chatHeader}>
                <div className={styles.chatActions}>
                    <button onClick={async () => await closeChat()} className={styles.backButton}>
                        Back
                    </button>
                    <button onClick={toggleAddMemberMenu} className={styles.addMemberButton}>
                        Add member
                    </button>
                    <button onClick={async () => await exitChat()} className={styles.exitChatButton}>
                        Exit chat
                    </button>
                </div>
                {
                    isShowAddMemberMenu 
                    ? <AddMemberMenu closeFunc={toggleAddMemberMenu} chatId={chatId} chatHub={chatHub} /> 
                    : null
                }
                <p className={styles.chatName}>
                    {chatName}
                </p>
            </div>
            <div className={styles.messagesZone}>
                {chatMessages.map((message, index) => 
                    <div className="message" key={index}>
                        {message.authorId !== null
                        ? <Message 
                            isMyMessage={user.userId.toString() === message.authorId?.toString()}
                            text={message.messageText}
                            authorName={message.authorName} />
                        : <EventMessage text={message.messageText} />}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <InputMessageField 
                onChange={e => setMessageText(e.target.value)} 
                onSend={() => addMessage(messageText, user.userId)} 
                messageText={messageText} />
        </div>
    );
};
