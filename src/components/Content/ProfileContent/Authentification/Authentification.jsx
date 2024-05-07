import { NavLink } from 'react-router-dom';
import styles from '../../../Styles/authentification.module.css'
import { useState } from "react";


export const Authentification = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [authErrorMessage, setAuthErrorMessage] = useState("");

    const setToken = () => {
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

        fetch("https://localhost:7185/api/account/SignIn", fetchOptions)
        .then(res => res.json())
        .then(token => {
            localStorage.setItem("jwt", token);
            window.location.reload();
        })
        .catch(setAuthErrorMessage("Incorrect login or password"));
    };

    return (
        <div className="authentification">
            <p className={styles.errorMessage}>{authErrorMessage}</p>

            <div className={styles.authentificationForm}>
                <label htmlFor='emailInput' className={styles.label}>Email</label>
                <br />
                <input id='emailInput' type="text"  className={styles.input} onChange={e => setUserEmail(e.target.value)}/>

                <label htmlFor='passwordInput' className={styles.label}>Password</label>
                <br />
                <input id='passwordInput' type="text" className={styles.input} onChange={e => setUserPassword(e.target.value)}/>
                
                <br />

                <div className={styles.submitButtonWrapper}>
                    <button className={styles.submitButton} onClick={setToken}>
                        Submit
                    </button>
                </div>

                <p className={styles.registrationLink}>
                    No account?  <NavLink to="/">Register it here</NavLink>
                </p>
            </div>
        </div>
    );
};