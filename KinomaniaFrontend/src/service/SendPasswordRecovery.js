import axios from "axios";


const SendPasswordRecovery = (code, password)=>{

    const url = 'http://localhost:8080/api/v1/updatePassword';
    const data = {
        recoveryCode: code,
        newPassword: password
    }


    return  axios.post(url, data)
        .then((response) => {
            console.log('Odpowiedź serwera:', response.data);
            return response
        })
        .catch((err) => {
            console.error('Błąd podczas wykonywania żądania POST:', err);
        });



};

export default SendPasswordRecovery;