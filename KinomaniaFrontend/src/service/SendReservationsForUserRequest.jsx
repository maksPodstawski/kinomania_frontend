import axios from "axios";


async function SendReservationsForUserRequest() {
    const url = 'http://localhost:8080/api/v1/report/reservationsForUser';

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default SendReservationsForUserRequest;