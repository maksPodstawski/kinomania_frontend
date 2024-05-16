import axios from "axios";


async function SendSeatsRequest(roomid) {
    const url = `http://localhost:8080/api/v1/seats/${roomid}`;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching screenings:", error);
        throw error;
    }
}

export default SendSeatsRequest;