import React, { useState } from "react";
import Header from "../components/Header.jsx";
import SendPasswordRecovery from "../service/SendPasswordRecoveryRequest.js";

const RecoverPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
        if (!validateEmail(email)) {
            alert("Wprowadź poprawny adres email");
        }
        else{
            const response = SendPasswordRecovery(email);
        }
    }

    return (
        <>
            <p>Odzyskaj hasło</p>
            <form onSubmit={handleSubmit}>
                <input
                    className="emailInput"
                    type="email"
                    placeholder="Wprowadź adres email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <button type="submit">Odzyskaj hasło</button>
            </form>
        </>
    )
}

export default RecoverPasswordPage;
