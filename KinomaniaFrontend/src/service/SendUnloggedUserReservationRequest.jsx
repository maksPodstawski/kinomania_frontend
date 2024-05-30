import axios from "axios";

const SendUnloggedUserReservationRequest = async (UserData)=>{
    const url = 'http://localhost:8080/api/v1/reservation/addUnLoggedUserReservation';

    return  axios.post(url, UserData )
        .then((odpowiedź) => {
            console.log('Odpowiedź serwera:', odpowiedź.data);
            return odpowiedź
        })
        .catch((błąd) => {
            console.error('Błąd podczas wykonywania żądania POST:', błąd);
        });
}
export default SendUnloggedUserReservationRequest;