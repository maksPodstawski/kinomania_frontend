import axios from 'axios';
import {redirect} from "react-router-dom";


const SendSeatReservationRequest = async (screening_id, seats_id) => {

    const url = 'http://localhost:8080/api/v1/reservation/addReservationWithPayment';
    const dane = {
        screeningId: screening_id,
        seatsId: seats_id
    }

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    return  axios.post(url, dane, {headers: headers})
        .then((odpowiedź) => {
            console.log('Odpowiedź serwera:', odpowiedź.data);
            return odpowiedź
        })
        .catch((błąd) => {
            console.error('Błąd podczas wykonywania żądania POST:', błąd);
        });
}
export default SendSeatReservationRequest;
