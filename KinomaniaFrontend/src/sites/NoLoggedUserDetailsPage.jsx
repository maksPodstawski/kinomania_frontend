import {useLocation, useNavigate} from "react-router-dom";
import "../styles/noLoggedUserDetailsStyles.css"
import {useState} from "react";

const NoLoggedUserDetailsPage = () => {

    const location = useLocation();
    const {screeningID, seats} = location.state || {};

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleNameChane = (event) =>{
        setName(event.target.value);
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }

    const handleSubmit = ()=>{
        const data = {
            email: email,
            name: name,
            mobile_number:phone,
            screeningId: screeningID,
            seatsId: seats
        }
        navigate(`/ulpayment`, {
            state: {
                data: data
            }
        });
    }

    return (
        <>
            <p>Niezalogowany gosc</p>
            <p> {screeningID} {seats}</p>
            <div className="unlogged-inputs">
                <input onChange={handleEmailChange} className="email" type="email" placeholder="Email"/>
                <input onChange={handleNameChane}  className="name" type="text" placeholder="Imię"/>
                <input onChange={handlePhoneChange} className="phone" type="text" placeholder="Numer telefonu"/>
            </div>
            <button onClick={handleSubmit}>Przejdź do płatności</button>
        </>
    )
}

export default NoLoggedUserDetailsPage;