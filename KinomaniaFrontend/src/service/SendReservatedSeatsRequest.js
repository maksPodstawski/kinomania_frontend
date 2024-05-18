import axios from "axios";


async function SendReservatedSeatsRequest(screeningid) {
    const url = `http://localhost:8080/api/v1/reservatedSeats/${screeningid}`;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching screenings:", error);
        throw error;
    }
}

export default SendReservatedSeatsRequest;