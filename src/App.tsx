import { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage/MainPage';

import { getAuthUser } from './utils/auth';

import './App.css';
import MainLayout from './layouts/MainLayout';

const App = () => {
    const [ isAuthUser, setIsAuthUser ] = useState<boolean>(false);

    useEffect(() => {
        setIsAuthUser(getAuthUser());
    }, [isAuthUser]);

    return (
        <Routes>
            <Route path="/" element={<MainLayout isAuthUser={isAuthUser} />}>
                <Route index element={ isAuthUser ? <MainPage /> : <LoginPage /> } />
            </Route>
        </Routes>
    )
}

export default App;
