import { Navigate, Route, Routes } from 'react-router-dom';
import { ChatsView } from "./ChatsView/ChatsView"
import { Profile } from './ProfileContent/Authentificated/Profile';
import { Authentification } from './ProfileContent/Authentification/Authentification';


export const Content = () => {
    let isAuthentificated = localStorage.getItem("jwt") != null;

    return (
        <div className="main">
            <Routes>
                <Route path='/' element={<Navigate to={"/chats"}/>} />
                <Route path="/chats" element={isAuthentificated ? <ChatsView /> : <h1>Authorize to see your chats</h1>} />
                <Route path="/profile" element={isAuthentificated ? <Profile /> : <Authentification />} />
            </Routes>
        </div>
    );
};