import { BrowserRouter } from 'react-router-dom';

// Components import
import { Content } from './Content/Content';
import { Header } from './Header';
import { NavBar } from './NavBar';


const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Content />
                <NavBar />
            </BrowserRouter>
        </div>
    );
};

export default App;
