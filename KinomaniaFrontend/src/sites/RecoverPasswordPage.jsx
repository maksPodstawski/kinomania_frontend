import React, { useState } from "react";
import Header from "../components/Header.jsx";
import SendPasswordRecovery from "../service/SendPasswordRecoveryRequest.js";
import '../styles/recoveryStyle.css';
import LogRegHeader from "../components/LogRegHeader.jsx";
import {useNavigate} from "react-router-dom";


const RecoverPasswordPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            alert("Wprowadź poprawny adres email");
        } else {
            const response = SendPasswordRecovery(email);
            alert("Wiadomość została wysłana");
            navigate('/');
        }


    }

    return (
        <>
            <LogRegHeader />
            <div className="recoveryPage-form">
                <div className="recovery-form">
                    <p className="recovery-title">Odzyskaj hasło</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <input
                                className="inputaaa"
                                type="email"
                                placeholder="Wprowadź adres email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <button type="submit">Odzyskaj hasło</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RecoverPasswordPage;
