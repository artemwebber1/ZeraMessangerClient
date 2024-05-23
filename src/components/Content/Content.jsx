import { Navigate, Route, Routes } from 'react-router-dom';
import { ChatsView } from "./ChatsView/ChatsView"
import { Profile } from './ProfileContent/Profile';
import { Chat } from './Chat/Chat';
import { useEffect } from 'react';


export const Content = () => {
    const loadUserData = () => {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        };

        fetch(`https://localhost:7185/api/account`, fetchOptions)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("user", JSON.stringify(data));
        });
    };

    useEffect(loadUserData, []);

    return (
        <Routes>
            <Route path='/' element={<Navigate to="/chats" />} />
            <Route path="/chats" element={<ChatsView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chats/:chatId" element={<Chat />} />
        </Routes>
    );
};