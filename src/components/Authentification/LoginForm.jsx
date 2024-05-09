import styles from '../Styles/authentification.module.css'
import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

export const LoginForm = (props) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const redirect = useNavigate();

    const setToken = async () => {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            },
            body: JSON.stringify({
                "email": userEmail,
                "password": userPassword
            })
        };

        const response = await fetch("https://localhost:7185/api/account/SignIn", fetchOptions);
        if (response.status === 403)
        {
            props.onFailed();
            return;
        }
        
        const token = await response.json();
        localStorage.setItem("jwt", token);
        redirect("/chats");
        window.location.reload();
    };


    return (
        <div className={styles.authentificationForm}>
            <label htmlFor='emailInput' className={styles.label}>Email</label>
            <br />
            <input id='emailInput' type="text"  className={styles.input} onChange={e => {
                setUserEmail(e.target.value);
                props.onChange();
            }}/>

            <label htmlFor='passwordInput' className={styles.label}>Password</label>
            <br />
            <input id='passwordInput' type="text" className={styles.input} onChange={e => {
                setUserPassword(e.target.value);
                props.onChange();
            }}/>

            <div className={styles.submitButtonWrapper}>
                <button className={styles.submitButton} onClick={setToken}>
                    Submit
                </button>
            </div>

            <p className={styles.registrationLink}>
                No account?  <NavLink to="/registration" onClick={props.onChange}>Register it here</NavLink>
            </p>
        </div>
    );
};