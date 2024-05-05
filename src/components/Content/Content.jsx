import { Route, Routes } from 'react-router-dom';
import { ChatsView } from "./ChatsView/ChatsView"
import { Profile } from './Profile/Profile';


export const Content = () => {
    return (
        <div className="main">
            <Routes>
                <Route path="/chats" element={<ChatsView />} />
                <Route path="/me" element={<Profile />}/>
            </Routes>
        </div>
    )
}