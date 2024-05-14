import { Navigate, Route, Routes } from 'react-router-dom';
import { ChatsView } from "./ChatsView/ChatsView"
import { Profile } from './ProfileContent/Profile';
import { Chat } from './Chat/Chat';


export const Content = ({setMainStyles}) => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/chats" />} />
            <Route path="/chats" element={<ChatsView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chats/:chatId" element={<Chat setMainStyles={setMainStyles} />} />
        </Routes>
    );
};