import { Navigate, Route, Routes } from 'react-router-dom';
import { ChatsView } from "./ChatsView/ChatsView"
import { Profile } from './ProfileContent/Profile';
import { Chat } from './Chat/Chat';
import { useEffect, useState } from 'react';


export const Content = ({setMainStyles}) => {
    const [user, setUser] = useState({});

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
            setUser(data);
        });
    };

    useEffect(loadUserData, []);

    return (
        <Routes>
            <Route path='/' element={<Navigate to="/chats" />} />
            <Route path="/chats" element={<ChatsView user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/chats/:chatId" element={<Chat setMainStyles={setMainStyles} user={user} />} />
        </Routes>
    );
};