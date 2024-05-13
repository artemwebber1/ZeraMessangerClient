import styles from '../Styles/authentification.module.css'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


export const RegistrationForm = (props) => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const redirect = useNavigate();

    const setToken = async () => {
        if ((userName === "" || userName.includes("'")) ||
            (userEmail === "" || userEmail.includes("'")) ||
            (userPassword === "" || userPassword.includes("'"))
        )
        {
            props.onFailed();
            return;
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            },
            body: JSON.stringify({
                "name": userName,
                "email": userEmail,
                "password": userPassword
            })
        };

        const response = await fetch("https://localhost:7185/api/account/SignUp", fetchOptions);
        if (response.status === 403)
        {
            props.onFailed();
            return;
        }
         
        redirect("/login");
    };


    return (
        <div className={styles.authentificationForm}>
            <label htmlFor='nameInput' className={styles.label}>Name</label>
            <br />
            <input id='nameInput' type="text" className={styles.input} onChange={e => {
                setUserName(e.target.value);
                props.onChange();
            }}/>

            <label htmlFor='emailInput' className={styles.label}>Email</label>
            <br />
            <input id='emailInput' type="text"  className={styles.input} onChange={e => {
                setUserEmail(e.target.value);
                props.onChange();
            }}/>

            <Input className="passwordInput" id="passwordInput" label="Password" onChange={e => {
                setUserPassword(e.target.value);
                props.onChange();
            }}/>

            <div className={styles.submitButtonWrapper}>
                <button className={styles.submitButton} onClick={setToken}>
                    Submit
                </button>
            </div>

            <p className={styles.registrationLink}>
                Have account?  <NavLink to="/login" onClick={props.onChange}>Login here</NavLink>
            </p>
        </div>
    );
}

const Input = (props) => {
    return (
        <div className={props.className}>
            <label htmlFor={props.id} className={styles.label}>{props.label}</label>
            <br />
            <input id={props.id} type="text" className={styles.input} onChange={props.onChange}/>
        </div>
    );
}
