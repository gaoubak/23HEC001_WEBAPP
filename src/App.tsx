import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthProvider, AuthContext } from './context/auth.context';
import { setUser } from './redux/user.slice';
import ApiUser from './api/user/user.api';
import Picture from './components/common/picture';
import Background from './assets/image/png/Background.png';
import BackgroundWebp from './assets/image/webp/Background.webp';
import Nav from './components/layout/nav';
import Auth from './pages/auth';
import Home from './pages/home';
import Channel from './pages/channel';
import Friend from './pages/friend';
import User from './pages/user';
import Err from './pages/err';
import './App.css';

function AuthRoutes() {
    return (
        <Routes>
            <Route path="*" element={<Auth />} />
        </Routes>
    );
}

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="Channel" element={<Channel />} />
                <Route path="Friend" element={<Friend />} />
                <Route path="User" element={<User />} />
            </Route>
            <Route path="*" element={<Err />} />
        </Routes>
    );
}

function AppContent() {
    const { isLoggedIn } = useContext(AuthContext);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            if (isLoggedIn) {
                try {
                    const response = await ApiUser.getCurrentUsers();
                    if (response) {
                        dispatch(setUser(response.data));
                        console.log(response.data);
                    }
                } catch (error) {
                    console.error(
                        'Erreur lors de la récupération des données utilisateur',
                        error
                    );
                }
            }
        };

        fetchUserData();
    }, [isLoggedIn, dispatch]);

    return (
        <>
            {isLoggedIn && <Nav />}
            {isLoggedIn ? <MainRoutes /> : <AuthRoutes />}
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
            <Picture
                className="Background"
                webpSrc={BackgroundWebp}
                fallbackSrc={Background}
                alt="logo"
            />
        </AuthProvider>
    );
}

export default App;
