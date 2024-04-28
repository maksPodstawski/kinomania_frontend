import React, {useState} from 'react';
import SendLoginRequest from "../service/SendLoginRequest.jsx";
import '../styles/loggingPageStyles.css'
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

function LoginComponent() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const saveTokenToLocalStorage = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token)
        localStorage.setItem('username', decoded["username"]);
        localStorage.setItem('authorities', decoded["authorities"]);
        console.log(localStorage.getItem('authorities'));
    };

    const handleSubmit = async () => {
        const token = await SendLoginRequest(login, password);
        setToken(token);
        saveTokenToLocalStorage(token);
        if(token !== ""){
            navigate('/');
        }
    }

    return (
        <div className="login-form">
            <h2>Login:</h2>
            <input id="login" name="login" type="text" placeholder="Wprowadź login" required onChange={handleLoginChange}/>
            <input id="password" name="password" type="password" placeholder="Wprowadź hasło" required onChange={handlePasswordChange}/>
            <button onClick={handleSubmit} type="submit">Zaloguj się</button>
            {token && <p>Token: {token}</p>}
        </div>
    );
}

export default LoginComponent;
