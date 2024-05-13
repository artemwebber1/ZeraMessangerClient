import { Navigate, Route, Routes } from 'react-router-dom';
import styles from '../Styles/authentification.module.css'
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';


export const Authentification = () => {
    const [authErrorMessage, setAuthErrorMessage] = useState("");

    const resetAuthErrorMessage = () => {
        if (authErrorMessage !== "")
            setAuthErrorMessage("");
    };

    return (
        <div className="authentification">
            <p className={styles.errorMessage}>{authErrorMessage}</p>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />}/>
                <Route path="/registration" element={<RegistrationForm onChange={resetAuthErrorMessage} onFailed={() => setAuthErrorMessage("This user already exists or data is incorrect")} />}/>
                <Route path="/login" element={<LoginForm onChange={resetAuthErrorMessage} onFailed={() => setAuthErrorMessage("Invalid email or password")} />} />
            </Routes>
        </div>
    );
};