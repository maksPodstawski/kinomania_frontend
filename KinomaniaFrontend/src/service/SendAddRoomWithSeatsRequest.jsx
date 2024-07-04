import axios from "axios";

const SendAddRoomWithSeatsRequest = (seatsAndRoomDTO) => {
    const url = 'http://localhost:8080/api/v1/panel/addRoomWithSeats';

    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return axios.post(url, seatsAndRoomDTO, { headers })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

export default SendAddRoomWithSeatsRequest;
