import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import SendReservationCancel from "../service/SendReservationCancel.js";
import Header from "../components/Header.jsx";
import "../styles/cancelPaymentStyle.css"

const CancelPaymentPage = () => {

    const searchParams = new URLSearchParams(location.search);

    const navigate = useNavigate();


    const reservationUUID = searchParams.get('uuid');

    const handleSubmit = () => {
        navigate("/");
    }


    useEffect(() => {
       SendReservationCancel(reservationUUID);
    }, []);
    return (
        <>
            <Header/>
            <div className="cancel-payment-container">
                <p className="success-text">Pomyślnie anulowano twoją rezerwację</p>
                <button onClick={handleSubmit} type="submit">Wróć na stronę główną</button>
            </div>
        </>
    )
}

export default CancelPaymentPage