import {useLocation, useNavigate} from "react-router-dom";
import "../styles/noLoggedUserDetailsStyles.css"
import {useState} from "react";
import Header from "../components/Header.jsx";

const NoLoggedUserDetailsPage = () => {

    const location = useLocation();
    const {screeningID, seats, seatsNumbers} = location.state || {} || {};

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleNameChane = (event) => {
        setName(event.target.value);
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }

    const handleSubmit = () => {
        const data = {
            email: email,
            name: name,
            mobile_number: phone,
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
            <Header/>
            <div className="user-details-container">
                <form onSubmit={handleSubmit}>
                    <h2>Uzupełnij swoje dane</h2>
                    <p>Wybrane siedzenia: {seatsNumbers}</p>
                    <div className="unlogged-inputs">
                        <input onChange={handleEmailChange} className="email" type="email" placeholder="Email" required/>
                        <input onChange={handleNameChane} className="name" type="text" placeholder="Imię" required/>
                        <input onChange={handlePhoneChange} className="phone" type="tel" placeholder="Numer telefonu" required/>
                    </div>
                    <button type="submit">Przejdź do płatności</button>
                </form>
            </div>
        </>
)
}

export default NoLoggedUserDetailsPage;