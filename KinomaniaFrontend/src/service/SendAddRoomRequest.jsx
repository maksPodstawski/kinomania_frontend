import axios from "axios";

const SendAddRoomRequest = (roomDto) => {
    const url = 'http://localhost:8080/api/v1/panel/addRoomToCinema';

    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    // Prepare headers with authorization token
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    // Send POST request with roomDto and headers
    return axios.post(url, roomDto, { headers })
        .then(response => response.data)
        .catch(error => {
            console.error("Błąd w dodawaniu kina:", error);
            throw error;
        });
};

export default SendAddRoomRequest;
