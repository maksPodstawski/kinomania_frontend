import axios from 'axios';


const SendSeatReservationRequest = async (screening_id, seats_id) => {

    const url = 'http://localhost:8080/api/v1/reservation/addReservation';
    const dane = {
        screeningId: screening_id,
        seatsId: seats_id
    }

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    return  axios.post(url, dane, {headers: headers})
        .then((response) => {
            return response
        })
        .catch((error) => {
            throw error;
        });
}
export default SendSeatReservationRequest;