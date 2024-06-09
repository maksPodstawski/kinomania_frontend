import axios from 'axios';

const SendPositionsRequest = async () => {
    const url = 'http://localhost:8080/api/v1/panel/getPositions';

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`
    }

    try {
        const response = await axios.get(url, {headers: headers});
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania stanowisk:', error);
    }
}

export default SendPositionsRequest;