import { BrowserRouter } from 'react-router-dom';

// Components import
import { Header } from './Header';
import { Content } from './Content/Content';
import { Authentification } from './Authentification/Authentification'
import { useState } from 'react';


const App = () => {
    // Проверка, аутентифицирован ли пользователь
    const isAuthentificated = localStorage.getItem("jwt") != null;
    const [mainStyles, setMainStyles] = useState({
        backgroundColor: "#A3E998",
        paddingTop: "60px",
        paddingBottom: "80%"});

    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <div className="main" style={mainStyles}>
                    {/* Если пользователь аутентифицирован, показываем ему контент для аутентифицированных пользователей. 
                        Если нет - окно для аутентификации. */}
                    { isAuthentificated ? <Content setMainStyles={setMainStyles} /> : <Authentification />}
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
