import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/auth.context';
import Auth from './pages/auth';
import Home from './pages/home';
import Channel from './pages/channel';
import Friend from './pages/friend';
import User from './pages/user';
import Err from './pages/err';
import './App.css';
import Background from './assets/image/Background.png';

function App() {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <AuthProvider>
            <Routes>
                <Route
                    path="/"
                    element={isLoggedIn ? <Navigate to="/Home" /> : <Auth />}
                />
                <Route path="Home">
                    <Route
                        index
                        element={isLoggedIn ? <Home /> : <Navigate to="/" />}
                    />
                    <Route
                        path="Channel"
                        element={isLoggedIn ? <Channel /> : <Navigate to="/" />}
                    />
                    <Route
                        path="Friend"
                        element={isLoggedIn ? <Friend /> : <Navigate to="/" />}
                    />
                </Route>
                <Route
                    path="User"
                    element={isLoggedIn ? <User /> : <Navigate to="/" />}
                />

                <Route path="*" element={<Err />} />
            </Routes>
            <img className="Background" src={Background} alt="Background" />
        </AuthProvider>
    );
}

export default App;
