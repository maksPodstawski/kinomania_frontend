import React from "react";
import {useNavigate} from "react-router-dom";
import '../styles/headerStyle.css'
import kinomaniaLogo from '../assets/kinomanialogo.jpg';


const LogRegHeader = () => {

    const navigate = useNavigate();
    const goHome = () =>{
        navigate('/');
    }
    return (
        <>
            <div className="header">
                <div className="header-logo">
                    <img src={kinomaniaLogo} alt="Kinomania Logo" id="logo" onClick={goHome}/>
                </div>
            </div>
        </>);

}

export default LogRegHeader;