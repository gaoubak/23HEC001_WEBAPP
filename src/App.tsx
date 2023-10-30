import { Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Auth from "./containers/Auth/Auth";
import Home from "./containers/Home/Home";
import AddChannel from "./containers/AddChannel/AddChannel";
import AddFriend from "./containers/AddFriend/AddFriend";
import Err from "./containers/Err/Err";

const App = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ isLoggedIn ? <Navigate to="/Home" />: <Auth /> } />
                <Route path="/Home" element={ isLoggedIn ? <Home /> : <Navigate to="/" /> } >
                    <Route path="/Add-Channel" element={ isLoggedIn ? <AddChannel /> : <Navigate to="/" /> }/>
                    <Route path="/Add-Friend" element={ isLoggedIn ? <AddFriend /> : <Navigate to="/" /> }/>
                </Route>
                <Route path="*" element={<Err/>} />
            </Routes>
        </div>
    );
};

export default App;
