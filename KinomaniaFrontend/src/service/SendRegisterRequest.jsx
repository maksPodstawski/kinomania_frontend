import axios from "axios";


async function SendRegisterRequest(username, password, email) {
    const url = 'http://localhost:8080/api/v1/auth/register';
    const dane = {
        username: username,
        password: password,
        email: email
    };

    return axios.post(url, dane)
        .then((odpowiedź) => {
            console.log('Odpowiedź serwera:', odpowiedź.data);
            return odpowiedź.data.accessToken
        })
        .catch((błąd) => {
            console.error('Błąd podczas wykonywania żądania POST:', błąd);
        });
}
export default SendRegisterRequest;