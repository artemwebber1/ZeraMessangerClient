import { Navigate, Route, Routes } from 'react-router-dom';
import { ChatsView } from "./ChatsView/ChatsView"
import { Profile } from './ProfileContent/Profile';


export const Content = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={"/chats"}/>} />
            <Route path="/chats" element={<ChatsView />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};