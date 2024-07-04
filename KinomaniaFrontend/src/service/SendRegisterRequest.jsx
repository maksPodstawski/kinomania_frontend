import axios from "axios";


async function SendRegisterRequest(username, password, email) {
    const url = 'http://localhost:8080/api/v1/auth/register';
    const dane = {
        username: username,
        password: password,
        email: email
    };

    return axios.post(url, dane)
        .then((response) => {
            return response.data.accessToken
        })
        .catch((error) => {
            throw error;
        });
}
export default SendRegisterRequest;