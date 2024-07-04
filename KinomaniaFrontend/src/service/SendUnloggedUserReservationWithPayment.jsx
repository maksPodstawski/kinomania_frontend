import axios from "axios";

const SendUnloggedUserReservationWithPayment = async (UserData)=>{
    const url = 'http://localhost:8080/api/v1/reservation/addUnLoggedUserReservationWithPayment';

    return  axios.post(url, UserData )
        .then((response) => {
            return response
        })
        .catch((error) => {
            throw error;
        });
}
export default SendUnloggedUserReservationWithPayment;