import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Channel from './pages/Channel/Channel';
import Friend from './pages/Friend/Friend';
import User from './pages/User/User';
import Err from './pages/Err/Err';
import './App.css';

const App = () => {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <AuthProvider>
            <Routes>
                <Route
                    path="/"
                    element={isLoggedIn ? <Navigate to="/Home" /> : <Auth />}
                />
                <Route path="Home/:channelId">
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
                    path="User/:userId"
                    element={isLoggedIn ? <User /> : <Navigate to="/" />}
                />
                <Route path="*" element={<Err />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
