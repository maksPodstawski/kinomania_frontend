import React from 'react';
import {useNavigate} from "react-router-dom";


function HomeSite() {

    const navigate = useNavigate();

    const goToLogin = () =>{
        navigate('/login');
    }
    const goToRegister = () =>{
        navigate('/register');
    }

    return (
        <div className="login-form">
            <button className="loginComponent" onClick={goToLogin}>Zaloguj się</button>
            <button className="registerComponent" onClick={goToRegister}>Zarejestruj się</button>
        </div>
    );
}

export default HomeSite;
