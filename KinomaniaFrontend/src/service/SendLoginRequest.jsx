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
            .then((response) => {
              return response.data.accessToken
            })
            .catch((error) => {
                throw error;
            });
}






export default SendLoginRequest;




