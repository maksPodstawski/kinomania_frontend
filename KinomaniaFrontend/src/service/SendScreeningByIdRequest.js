import axios from "axios";


async function SendScreeningByIdRequest(screeningid) {
    const url = `http://localhost:8080/api/v1/screening/${screeningid}`;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching screenings:", error);
        throw error;
    }
}

export default SendScreeningByIdRequest;