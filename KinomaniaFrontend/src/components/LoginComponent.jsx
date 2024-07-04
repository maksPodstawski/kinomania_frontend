import React, {useState} from 'react';
import SendLoginRequest from '../service/SendLoginRequest.jsx';
import '../styles/loggingPageStyles.css';
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import LogRegHeader from "./LogRegHeader.jsx";

function LoginComponent() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const saveTokenToLocalStorage = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        localStorage.setItem('username', decoded['username']);
        localStorage.setItem('authorities', decoded['authorities']);
        console.log(localStorage.getItem('authorities'));
    };

    const handleSubmit = async () => {
        const token = await SendLoginRequest(login, password);
        setToken(token);
        saveTokenToLocalStorage(token);
        if (token !== '') {
            navigate('/');
        }
    };

    const handleResetPassword = () => {
        navigate(`/recoverMyPassword`);
    }

    return (
        <>
            <LogRegHeader/>
            <div className="loginPage-form">
                <div className="login-form">
                    <h2>Login:</h2>
                    <input
                        id="login"
                        name="login"
                        type="text"
                        placeholder="Wprowadź login"
                        required
                        onChange={handleLoginChange}
                    />
                    <div className="input-container">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Wprowadź hasło"
                            required
                            onChange={handlePasswordChange}
                        />
                        <span className="toggle-password" onClick={togglePasswordVisibility}>
        {showPassword ? <i className="gg-eye-alt"></i> : <i className="gg-eye"></i>}
            </span>
                        <a className="recover-password" onClick={handleResetPassword}>Kliknij tutaj, aby zresetować hasło</a>
                    </div>
                    <button onClick={handleSubmit} type="submit">
                    Zaloguj się
                    </button>
                    {token && <p>Token: {token}</p>}
                </div>
            </div>
        </>);
}

export default LoginComponent;