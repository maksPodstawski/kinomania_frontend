import axios from "axios";

const SendUnloggedUserReservationRequest = async (UserData)=>{
    const url = 'http://localhost:8080/api/v1/reservation/addUnLoggedUserReservation';

    return  axios.post(url, UserData )
        .then((response) => {
            return response
        })
        .catch((error) => {
            throw error;
        });


}
export default SendUnloggedUserReservationRequest;