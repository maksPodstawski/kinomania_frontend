import axios from 'axios';

const GetUsersTicketAmount = async () => {
    const url = "http://localhost:8080/api/v1/report/usersTicketsAmount"

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    return  axios.get(url,{headers: headers})
        .then((response) => {
            console.log('Odpowiedź serwera:', response.data);
            return response.data
        })
        .catch((error) => {
            console.error('Błąd podczas wykonywania żądania GET:', error);
        });
}

export default GetUsersTicketAmount;