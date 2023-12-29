import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/auth.context';
import Picture from './components/common/picture';
import Background from './assets/image/png/background.png';
import BackgroundWebp from './assets/image/webp/background.webp';
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
