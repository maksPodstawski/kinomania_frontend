import React from "react";
import {useNavigate} from "react-router-dom";
import '../styles/headerStyle.css'
import kinomaniaLogo from '../assets/kinomanialogo.jpg';


const Header = () => {

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    }
    const goToRegister = () => {
        navigate('/register');
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }
    const handlePanel = () =>{
        navigate('/panel');
    }
    const goHome = () =>{
        navigate('/');
    }

    if(localStorage.getItem('username') !== null) {
        if(localStorage.getItem('authorities') === "ROLE_ADMIN"){
            return (
                <>
                    <div className="header">
                        <div className="header-logo">
                            <img src={kinomaniaLogo} alt="Kinomania Logo" id="logo" onClick={goHome}/>
                        </div>
                        <div className="header-buttons">
                            <h2>{localStorage.getItem('username')}</h2>
                            <button className="button-panel" onClick={handlePanel}>Panel</button>
                            <button className="button-logout" onClick={handleLogout}>Wyloguj</button>
                        </div>
                    </div>
                </>
            )

        }
        else {
            return (
                <>
                    <div className="header">
                        <div className="header-logo">
                            <img src={kinomaniaLogo} alt="Kinomania Logo" id="logo" onClick={goHome}/>
                        </div>
                        <div className="header-buttons">
                            <h2>{localStorage.getItem('username')}</h2>
                            <button className="button-logout" onClick={handleLogout}>Wyloguj</button>
                        </div>
                    </div>
                </>
            )
        }

    }
    else{
        return (
            <>
                <div className="header">
                    <div className="header-logo">
                        <img src={kinomaniaLogo} alt="Kinomania Logo" id="logo" onClick={goHome}/>
                    </div>
                    <div className="header-buttons">
                        <button className="loginComponent" onClick={goToLogin}>Zaloguj się</button>
                        <button className="registerComponent" onClick={goToRegister}>Zarejestruj się</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Header;