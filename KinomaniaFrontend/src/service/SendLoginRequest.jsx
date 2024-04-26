import {useState} from "react";
import axios from "axios";


async function SendLoginRequest (username, password)
{
    const url = 'http://localhost:8080/api/v1/auth/login';
    const dane = {
        username: username,
        password: password
    };

    return  axios.post(url, dane)
            .then((odpowiedź) => {
              console.log('Odpowiedź serwera:', odpowiedź.data);
              return odpowiedź.data.accessToken
            })
            .catch((błąd) => {
                console.error('Błąd podczas wykonywania żądania POST:', błąd);
            });
}






export default SendLoginRequest;




