import axios from "axios";

const SendUnloggedUserReservationWithPayment = async (UserData)=>{
    const url = 'http://localhost:8080/api/v1/reservation/addUnLoggedUserReservationWithPayment';

    return  axios.post(url, UserData )
        .then((response) => {
            console.log('Odpowiedź serwera:', response.data);
            return response
        })
        .catch((err) => {
            console.error('Błąd podczas wykonywania żądania POST:', err);
        });
}
export default SendUnloggedUserReservationWithPayment;