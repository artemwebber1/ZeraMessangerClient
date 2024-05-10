import { BrowserRouter } from 'react-router-dom';

// Components import
import { Header } from './Header';
import { Content } from './Content/Content';
import { Authentification } from './Authentification/Authentification'


const App = () => {
    // Проверка, аутентифицирован ли пользователь
    let isAuthentificated = localStorage.getItem("jwt") != null;

    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <div className="main">
                    {/* Если пользователь аутентифицирован, показываем ему контент для аутентифицированных пользователей. 
                        Если нет - окно для аутентификации. */}
                    { isAuthentificated ? <Content /> : <Authentification />}
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
