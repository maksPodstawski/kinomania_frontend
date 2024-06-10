import axios from "axios";

const SendUpdateVipStatus = async (userID)=>{
    const url = 'http://localhost:8080/api/v1/worker/setVipStatus/' + userID;

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
    }


    return  axios.put(url, "", {headers: headers})
        .then((response) => {
            console.log('Odpowiedź serwera:', response.data);
            return response
        })
        .catch((error) => {
            console.error('Błąd podczas wykonywania żądania PUT:', error);
        });
}
export default SendUpdateVipStatus;