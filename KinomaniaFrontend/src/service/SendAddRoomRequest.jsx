import axios from "axios";

const SendAddRoomRequest = (roomDto) => {
    const url = 'http://localhost:8080/api/v1/panel/addRoomToCinema';

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axios.post(url, roomDto, { headers })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

export default SendAddRoomRequest;
