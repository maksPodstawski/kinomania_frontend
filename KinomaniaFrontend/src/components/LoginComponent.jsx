import React, {useState} from 'react';
import SendLoginRequest from "../service/SendLoginRequest.jsx";

function LoginComponent() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const saveTokenToLocalStorage = (token) => {
        localStorage.setItem('token', token);
    };

    const handleSubmit = async () => {
        const token = await SendLoginRequest(login, password);
        setToken(token);
        saveTokenToLocalStorage(token);
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
