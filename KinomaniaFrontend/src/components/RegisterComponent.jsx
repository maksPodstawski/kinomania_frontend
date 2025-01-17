import React, { useState } from 'react';
import SendRegisterRequest from "../service/SendRegisterRequest.jsx";
import '../styles/registerPageStyle.css'
import {jwtDecode} from "jwt-decode"; // corrected import for jwtDecode
import { useNavigate } from "react-router-dom";
import LogRegHeader from "./LogRegHeader.jsx";

function RegisterComponent() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handlePasswordAgainChange = (event) => {
        setPasswordAgain(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const saveTokenToLocalStorage = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        localStorage.setItem('username', decoded["username"]);
        localStorage.setItem('authorities', decoded["authorities"][0]);
    };

    const handleSubmit = async () => {
        if (!login.trim()) {
            alert("Login nie może być pusty!");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Email jest niepoprawny!");
            return;
        }

        if (!password.trim() || !passwordAgain.trim()) {
            alert("Hasło nie może być puste!");
            return;
        }

        if (password !== passwordAgain) {
            alert("Hasła są różne!");
            return;
        }

        try {
            const token = await SendRegisterRequest(login, password, email);
            setToken(token);
            saveTokenToLocalStorage(token);
            if (token !== "") {
                navigate('/');
            }
        } catch (error) {
            if (!error.response) {
                alert("Nazwa użytkownika lub email są już w użyciu!");
            }
        }
    }

    return (
        <>
            <LogRegHeader />
            <div className="registerPage-form">
                <div className="register-form">
                    <h2>Rejestracja</h2>
                    <input id="login" name="login" type="text" placeholder="Wprowadź login" required
                           onChange={handleLoginChange} />
                    <div className="input-container-register">
                        <input id="password" name="password" type={showPassword ? 'text' : 'password'}
                               placeholder="Wprowadź hasło" required onChange={handlePasswordChange} />
                        <span className="toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? <i className="gg-eye-alt"></i> : <i className="gg-eye"></i>}
                        </span>
                    </div>
                    <div className="input-container-register2">
                        <input id="password-again" name="password-again" type={showPassword ? 'text' : 'password'}
                               placeholder="Wprowadź hasło ponownie" required onChange={handlePasswordAgainChange} />
                        <span className="toggle-password-again" onClick={togglePasswordVisibility}>
                            {showPassword ? <i className="gg-eye-alt"></i> : <i className="gg-eye"></i>}
                        </span>
                    </div>
                    <input id="email" name="email" type="email" placeholder="Wprowadź email" required
                           onChange={handleEmailChange} />
                    <button onClick={handleSubmit} type="submit">Zarejestruj się</button>
                    {token && <p>Token: {token}</p>}
                </div>
            </div>
        </>
    );
}

export default RegisterComponent;
