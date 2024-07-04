import axios from 'axios';

const SendUsersRequest = async () => {
    const url = 'http://localhost:8080/api/v1/panel/getUsers';

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`
    }

    try {
        const response = await axios.get(url, {headers: headers});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default SendUsersRequest;