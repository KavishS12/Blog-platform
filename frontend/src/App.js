import React from 'react';
import PostList from './components/PostList';
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import { useState, createContext } from 'react';
import { ToastContainer } from "react-toastify";

export const UserContext = createContext();

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isToggled, setIsToggled] = useState('Login');
    const [user, setUser] = useState(null);
    const handleToggle = () => {
        setIsToggled((prevState) => prevState ==='Login' ? 'Signup' : 'Login');
    };

    if(loggedIn) return (
            <div className="App">
                <h1>Your Blog Space</h1>
                <p className='user'>{user.name}</p>
                <button className="logoutBtn" onClick={() => setLoggedIn(false)}>Logout</button>
                <PostList />
            </div>
    );
    else {
        return (
            <div className="App">
                <UserContext.Provider value={{ user, setUser }}>
                    <ToastContainer position="top-center" autoClose={3000} />
                    <h1>Welcome to Your Blog Space</h1>
                    <p className='subheading'>Please login/signup to continue</p>
                    <div className="toggleBtnsDiv">
                        <button onClick={handleToggle} disabled={isToggled==='Login'} className="toggleBtn">Login</button>
                        <button onClick={handleToggle} disabled={isToggled==='Signup'} className="toggleBtn">Signup</button>
                    </div>
                    {isToggled === "Login" ? (
                        <Login setLoggedIn={setLoggedIn}/> 
                        ) : (
                        <Signup setLoggedIn={setLoggedIn}/>
                    )}
                </UserContext.Provider>
            </div>
        );
    }
};

export default App;
