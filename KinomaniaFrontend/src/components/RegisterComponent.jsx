import React, {useState} from 'react';
import SendRegisterRequest from "../service/SendRegisterRequest.jsx";

function RegisterComponent() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState(null);

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async () => {
        const token = await SendRegisterRequest(login, password, email);
        setToken(token);
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
