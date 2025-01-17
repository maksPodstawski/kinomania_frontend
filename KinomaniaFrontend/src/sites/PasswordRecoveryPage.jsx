import {useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
import SendPasswordRecovery from "../service/SendPasswordRecovery.js";
import Header from "../components/Header.jsx";
import '../styles/recoveryStyle2.css';
import LogRegHeader from "../components/LogRegHeader.jsx";

const PasswordRecoveryPage = () => {

    const { code } = useParams();
    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    const navigate = useNavigate();

    const handleFirstPasswordChange = (e) => {
        setFirstPassword(e.target.value);
    }
    const handleSecondPasswordChange = (e) => {
        setSecondPassword(e.target.value);
    }
    const handleSubmit = async () => {
        if (!firstPassword.length && !secondPassword.length) {
            alert("Pola nie mogą być puste");
        } else if (firstPassword !== secondPassword) {
            alert("Hasła muszą być takie same");
        } else {
            const response = await SendPasswordRecovery(code, firstPassword);
            if (response.data.statusCode === 1) {
                alert("Zmieniono hasło pomyślnie");
                navigate("/");
            }
            else {
                alert(response.data.message);
                navigate("/");
            }
        }
    }

    return (
        <>
            <LogRegHeader />
            <div className="passwordRecoveryPage-form">
                <div className="password-recovery-form">
                    <p className="recovery-title">Zresetuj hasło</p>
                    <div className="password-recovery-inputs">
                        <input
                            className="password-input"
                            onChange={handleFirstPasswordChange}
                            type="password"
                            placeholder="Wprowadź nowe hasło"
                        />
                        <input
                            className="password-input"
                            onChange={handleSecondPasswordChange}
                            type="password"
                            placeholder="Powtórz nowe hasło"
                        />
                    </div>
                    <button className="submit-button" onClick={handleSubmit}>Zmień hasło</button>
                </div>
            </div>
        </>
    )
}

export default PasswordRecoveryPage;
