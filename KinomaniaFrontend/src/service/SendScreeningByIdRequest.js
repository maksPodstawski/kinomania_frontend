import axios from "axios";


async function SendScreeningByIdRequest(screeningid) {
    const url = `http://localhost:8080/api/v1/screening/${screeningid}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default SendScreeningByIdRequest;