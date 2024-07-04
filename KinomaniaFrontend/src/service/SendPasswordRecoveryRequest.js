import axios from "axios";


const SendPasswordRecovery = (email)=>{

    const url = 'http://localhost:8080/api/v1/passwordRecovery/' + email;

    return  axios.post(url)
        .then((response) => {
            console.log('Odpowiedź serwera:', response.data);
            return response
        })
        .catch((err) => {
            console.error('Błąd podczas wykonywania żądania POST:', err);
        });



};

export default SendPasswordRecovery;