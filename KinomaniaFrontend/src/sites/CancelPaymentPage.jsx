import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import SendReservationCancel from "../service/SendReservationCancel.js";

const CancelPaymentPage = () => {

    const searchParams = new URLSearchParams(location.search);

    const navigate = useNavigate();



    const reservationUUID = searchParams.get('uuid');

    const handleSubmit = ()=>{
        navigate("/");
    }


    useEffect( () => {
         SendReservationCancel(reservationUUID).then(r => console.log(r));
    }, []);
    return(
        <>
            <p>Anulowano zamówienie: {reservationUUID}</p>
            <button onClick={handleSubmit} type="submit">Wróć na stronę główną</button>
        </>
    )
}

export default CancelPaymentPage