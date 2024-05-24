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
    const goToCinemas = () => {
        navigate('/cinemas');
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }
    const goToPanel = () =>{
        navigate('/panel');
    }
    const goHome = () =>{
        navigate('/');
    }
    const goToWorkerPanel = () =>{
        navigate('/workerPanel');
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
                            <button className="button-cinemas" onClick={goToCinemas}>Kina</button>
                            <button className="button-panel" onClick={goToPanel}>Panel</button>
                            <button className="button-logout" onClick={handleLogout}>Wyloguj</button>
                        </div>
                    </div>
                </>
            )

        }
        else if(localStorage.getItem('authorities') === "ROLE_WORKER") {
            return (
                <>
                    <div className="header">
                        <div className="header-logo">
                            <img src={kinomaniaLogo} alt="Kinomania Logo" id="logo" onClick={goHome}/>
                        </div>
                        <div className="header-buttons">
                            <h2>{localStorage.getItem('username')}</h2>
                            <button className="button-cinemas" onClick={goToCinemas}>Kina</button>
                            <button className="button-panel" onClick={goToWorkerPanel}>Panel</button>
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
                            <button className="button-cinemas" onClick={goToCinemas}>Kina</button>
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
                        <button className="button-cinemas" onClick={goToCinemas}>Kina</button>
                        <button className="loginComponent" onClick={goToLogin}>Zaloguj się</button>
                        <button className="registerComponent" onClick={goToRegister}>Zarejestruj się</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Header;