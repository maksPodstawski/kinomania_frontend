import React, {useState} from 'react';
import SendRegisterRequest from "../service/SendRegisterRequest.jsx";
import '../styles/registerPageStyle.css'
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

function RegisterComponent() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const saveTokenToLocalStorage = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token)
        localStorage.setItem('username', decoded["username"]);
        localStorage.setItem('authorities', decoded["authorities"][0]);
    };

    const handleSubmit = async () => {
        const token = await SendRegisterRequest(login, password, email);
        setToken(token);
        saveTokenToLocalStorage(token);
        if(token !== ""){
            navigate('/');
        }
    }

    return (
        <div className="register-form">
            <h2>Register:</h2>
            <input id="login" name="login" type="text" placeholder="Wprowadź login" required onChange={handleLoginChange}/>
            <input id="password" name="password" type="password" placeholder="Wprowadź hasło" required onChange={handlePasswordChange}/>
            <input id="email" name="email" type="email" placeholder="Wprowadź email" required onChange={handleEmailChange}/>
            <button onClick={handleSubmit} type="submit">Zarejestruj się</button>
            {token && <p>Token: {token}</p>}
        </div>
    );
}

export default RegisterComponent;
